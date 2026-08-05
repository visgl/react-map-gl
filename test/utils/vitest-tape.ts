import {expect, test as vitestTest} from 'vitest';

type TestCallback = (test: Test) => void | Promise<void>;

function usesExplicitEndSignal(callback: TestCallback): boolean {
  return /\.end\s*\(/.test(callback.toString());
}

export interface Test {
  comment(...messages: unknown[]): void;
  deepEqual(actual: unknown, expected: unknown, message?: string): void;
  doesNotThrow(callback: () => unknown, message?: string): void;
  end(): void;
  equal(actual: unknown, expected: unknown, message?: string): void;
  fail(message?: string): never;
  is(actual: unknown, expected: unknown, message?: string): void;
  not(actual: unknown, expected: unknown, message?: string): void;
  notEqual(actual: unknown, expected: unknown, message?: string): void;
  notOk(value: unknown, message?: string): void;
  ok(value: unknown, message?: string): void;
  timeoutAfter(timeoutMilliseconds: number): void;
}

class VitestTape implements Test {
  private readonly endPromise: Promise<void>;
  private endResolver: (() => void) | null = null;
  private timeoutMilliseconds?: number;

  constructor() {
    this.endPromise = new Promise(resolvePromise => {
      this.endResolver = resolvePromise;
    });
  }

  comment(...messages: unknown[]): void {
    console.log(...messages);
  }

  deepEqual(actual: unknown, expected: unknown, message?: string): void {
    expect(actual, message).toEqual(expected);
  }

  doesNotThrow(callback: () => unknown, message?: string): void {
    expect(callback, message).not.toThrow();
  }

  end(): void {
    this.endResolver?.();
    this.endResolver = null;
  }

  equal(actual: unknown, expected: unknown, message?: string): void {
    expect(actual, message).toBe(expected);
  }

  fail(message?: string): never {
    throw new Error(message || 'Forced failure');
  }

  is(actual: unknown, expected: unknown, message?: string): void {
    this.equal(actual, expected, message);
  }

  not(actual: unknown, expected: unknown, message?: string): void {
    this.notEqual(actual, expected, message);
  }

  notEqual(actual: unknown, expected: unknown, message?: string): void {
    expect(actual, message).not.toBe(expected);
  }

  notOk(value: unknown, message?: string): void {
    expect(value, message).toBeFalsy();
  }

  ok(value: unknown, message?: string): void {
    expect(value, message).toBeTruthy();
  }

  timeoutAfter(timeoutMilliseconds: number): void {
    this.timeoutMilliseconds = timeoutMilliseconds;
  }

  async run(callback: TestCallback): Promise<void> {
    const waitsForEnd = usesExplicitEndSignal(callback);
    const callbackPromise = Promise.resolve(callback(this));
    const completionPromise = waitsForEnd
      ? callbackPromise.then(() => this.endPromise)
      : callbackPromise;

    if (this.timeoutMilliseconds === undefined) {
      await completionPromise;
      return;
    }

    await Promise.race([
      completionPromise,
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error(`Test timed out after ${this.timeoutMilliseconds}ms`)),
          this.timeoutMilliseconds
        )
      )
    ]);
  }
}

export type TapeTestFunction = {
  (name: string, callback: TestCallback): ReturnType<typeof vitestTest>;
  only: (name: string, callback: TestCallback) => ReturnType<typeof vitestTest.only>;
  skip: (name: string, callback?: TestCallback) => ReturnType<typeof vitestTest.skip>;
};

function wrapTest(
  implementation: typeof vitestTest | typeof vitestTest.only
): (name: string, callback?: TestCallback) => ReturnType<typeof implementation> {
  return ((name: string, callback?: TestCallback) =>
    implementation(name, async () => {
      if (callback) {
        await new VitestTape().run(callback);
      }
    })) as (name: string, callback?: TestCallback) => ReturnType<typeof implementation>;
}

const test = wrapTest(vitestTest) as TapeTestFunction;
test.only = wrapTest(vitestTest.only);
test.skip = wrapTest(vitestTest.skip);

export default test;
