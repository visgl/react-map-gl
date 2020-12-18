export const ANCHOR_POSITION = {
  top: {x: 0.5, y: 0},
  'top-left': {x: 0, y: 0},
  'top-right': {x: 1, y: 0},
  bottom: {x: 0.5, y: 1},
  'bottom-left': {x: 0, y: 1},
  'bottom-right': {x: 1, y: 1},
  left: {x: 0, y: 0.5},
  right: {x: 1, y: 0.5}
};

const ANCHOR_TYPES = Object.keys(ANCHOR_POSITION);

/**
 * Calculate the dynamic position for a popup to fit in a container.
 * @param {Object} opts
 * @param {Number} opts.x - x position of the anchor on screen
 * @param {Number} opts.y - y position of the anchor on screen
 * @param {Number} opts.width - width of the container
 * @param {Number} opts.height - height of the container
 * @param {Number} opts.padding - extra space from the edge in pixels
 * @param {Number} opts.selfWidth - width of the popup
 * @param {Number} opts.selfHeight - height of the popup
 * @param {String} opts.anchor - type of the anchor, one of 'top', 'bottom',
    'left', 'right', 'top-left', 'top-right', 'bottom-left' , and  'bottom-right'
 * @returns {String} position - one of 'top', 'bottom',
    'left', 'right', 'top-left', 'top-right', 'bottom-left' , and  'bottom-right'
 */
// eslint-disable-next-line complexity,max-statements
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
  let {x: anchorX, y: anchorY} = ANCHOR_POSITION[anchor];

  // anchorY: top - 0, center - 0.5, bottom - 1
  let top = y - anchorY * selfHeight;
  let bottom = top + selfHeight;
  let cutoffY = Math.max(0, padding - top) + Math.max(0, bottom - height + padding);

  if (cutoffY > 0) {
    // Needs vertical adjustment
    let bestAnchorY = anchorY;
    let minCutoff = cutoffY;
    // Test anchorY at 0.5 step between [0, 1]
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

  // If needed, adjust anchorX at 0.5 step between [0, 1]
  let xStep = 0.5;
  if (anchorY === 0.5) {
    // If y is centered, then x cannot also be centered
    anchorX = Math.floor(anchorX);
    xStep = 1;
  }

  // anchorX: left - 0, center - 0.5, right - 1
  let left = x - anchorX * selfWidth;
  let right = left + selfWidth;
  let cutoffX = Math.max(0, padding - left) + Math.max(0, right - width + padding);

  if (cutoffX > 0) {
    // Needs horizontal adjustment
    let bestAnchorX = anchorX;
    let minCutoff = cutoffX;
    // Test anchorX at xStep between [0, 1]
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

  // Find the name of the new anchor position
  return (
    ANCHOR_TYPES.find(positionType => {
      const anchorPosition = ANCHOR_POSITION[positionType];
      return anchorPosition.x === anchorX && anchorPosition.y === anchorY;
    }) || anchor
  );
}
