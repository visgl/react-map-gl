// flow-typed signature: c5dcf8371f0c917dbab4076653911104
// flow-typed version: <<STUB>>/math.gl_v2.0.0/flow_v0.80.0

declare module 'math.gl' {
  declare function clamp(value: number, min: number, max: number): number;
  declare function equals(a: number, b: number): boolean;
  declare function lerp(a: number, b: number, t: number): number;
  declare function lerp(a: Array<number>, b: Array<number>, t: number) : Array<number>;
}
