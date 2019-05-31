// flow-typed signature: fa944fc1e1798c91431b13f0f22e2068
// flow-typed version: <<STUB>>/mjolnir.js_v2.0.0/flow_v0.80.0

declare module 'mjolnir.js' {
  declare class EventManager {
    constructor(?HTMLDivElement, any) : EventManager;
    setElement(HTMLDivElement) : void;
    destroy() : void;
    on(any) : void;
    off(any) : void;
  }

  declare type MjolnirEvent = {
    type: string,
    center: {x: number, y: number},
    offsetCenter: {x: number, y: number},
    deltaX: number,
    deltaY: number,
    delta: number,
    scale: number,
    rotation: number,
    pointerType: string,
    metaKey: boolean,
    rightButton: boolean,
    stopPropagation: Function,
    preventDefault: Function,
    target: HTMLElement,
    srcEvent: any
  };
}
