export const ANCHOR_POSITION = {
  top: {
    x: 0.5,
    y: 0
  },
  'top-left': {
    x: 0,
    y: 0
  },
  'top-right': {
    x: 1,
    y: 0
  },
  bottom: {
    x: 0.5,
    y: 1
  },
  'bottom-left': {
    x: 0,
    y: 1
  },
  'bottom-right': {
    x: 1,
    y: 1
  },
  left: {
    x: 0,
    y: 0.5
  },
  right: {
    x: 1,
    y: 0.5
  }
};
const ANCHOR_TYPES = Object.keys(ANCHOR_POSITION);
export function getDynamicPosition({
  x,
  y,
  width,
  height,
  selfWidth,
  selfHeight,
  anchor,
  padding = 0
}) {
  let {
    x: anchorX,
    y: anchorY
  } = ANCHOR_POSITION[anchor];
  let top = y - anchorY * selfHeight;
  let bottom = top + selfHeight;
  let cutoffY = Math.max(0, padding - top) + Math.max(0, bottom - height + padding);

  if (cutoffY > 0) {
    let bestAnchorY = anchorY;
    let minCutoff = cutoffY;

    for (anchorY = 0; anchorY <= 1; anchorY += 0.5) {
      top = y - anchorY * selfHeight;
      bottom = top + selfHeight;
      cutoffY = Math.max(0, padding - top) + Math.max(0, bottom - height + padding);

      if (cutoffY < minCutoff) {
        minCutoff = cutoffY;
        bestAnchorY = anchorY;
      }
    }

    anchorY = bestAnchorY;
  }

  let xStep = 0.5;

  if (anchorY === 0.5) {
    anchorX = Math.floor(anchorX);
    xStep = 1;
  }

  let left = x - anchorX * selfWidth;
  let right = left + selfWidth;
  let cutoffX = Math.max(0, padding - left) + Math.max(0, right - width + padding);

  if (cutoffX > 0) {
    let bestAnchorX = anchorX;
    let minCutoff = cutoffX;

    for (anchorX = 0; anchorX <= 1; anchorX += xStep) {
      left = x - anchorX * selfWidth;
      right = left + selfWidth;
      cutoffX = Math.max(0, padding - left) + Math.max(0, right - width + padding);

      if (cutoffX < minCutoff) {
        minCutoff = cutoffX;
        bestAnchorX = anchorX;
      }
    }

    anchorX = bestAnchorX;
  }

  return ANCHOR_TYPES.find(positionType => {
    const anchorPosition = ANCHOR_POSITION[positionType];
    return anchorPosition.x === anchorX && anchorPosition.y === anchorY;
  }) || anchor;
}
//# sourceMappingURL=dynamic-position.js.map