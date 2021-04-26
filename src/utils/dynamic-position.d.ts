export type PositionType = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right';

export const ANCHOR_POSITION: Record<PositionType, {
  x: number,
  y: number
}>;

export function getDynamicPosition(opts: {
  x: number,
  y: number,
  width: number,
  height: number,
  selfWidth: number,
  selfHeight: number,
  anchor: PositionType,
  padding: number
}): PositionType;
