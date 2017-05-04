
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

/**
 * Calculate the dynamic position for a popup to fit in a container.
 * @param {Number} x - x position of the anchor on screen
 * @param {Number} y - y position of the anchor on screen
 * @param {Number} width - width of the container
 * @param {Number} height - height of the container
 * @param {Number} padding - extra space from the edge in pixels
 * @param {Number} selfWidth - width of the popup
 * @param {Number} selfHeight - height of the popup
 * @param {String} anchor - type of the anchor, one of 'top', 'bottom',
    'left', 'right', 'top-left', 'top-right', 'bottom-left' , and  'bottom-right'
 * @returns {String} position - one of 'top', 'bottom',
    'left', 'right', 'top-left', 'top-right', 'bottom-left' , and  'bottom-right'
 */
export function getDynamicPosition({x, y, width, height, selfWidth, selfHeight, anchor, padding}) {
  let {x: anchorX, y: anchorY} = ANCHOR_POSITION[anchor];

  let top = y - anchorY * selfHeight;
  let bottom = top + selfHeight;
  const yStep = 0.5;

  if (top < padding) {
    while (top < padding && anchorY >= yStep) {
      anchorY -= yStep;
      top += yStep * selfHeight;
    }
  } else if (bottom > height - padding) {
    while (bottom > height - padding && anchorY <= 1 - yStep) {
      anchorY += yStep;
      bottom -= yStep * selfHeight;
    }
  }

  let xStep = 0.5;
  if (anchorY === 0.5) {
    // If y is centered, x cannot also be centered
    anchorX = Math.floor(anchorX);
    xStep = 1;
  }

  let left = x - anchorX * selfWidth;
  let right = left + selfWidth;

  if (left < padding) {
    while (left < padding && anchorX >= xStep) {
      anchorX -= xStep;
      left += xStep * selfWidth;
    }
  } else if (right > width - padding) {
    while (right > width - padding && anchorX <= 1 - xStep) {
      anchorX += xStep;
      right -= xStep * selfWidth;
    }
  }

  return Object.keys(ANCHOR_POSITION).find(positionType => {
    const anchorPosition = ANCHOR_POSITION[positionType];
    return anchorPosition.x === anchorX && anchorPosition.y === anchorY;
  });
}
