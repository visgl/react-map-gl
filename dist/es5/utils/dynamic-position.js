"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDynamicPosition = getDynamicPosition;
exports.ANCHOR_POSITION = void 0;
var ANCHOR_POSITION = {
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
exports.ANCHOR_POSITION = ANCHOR_POSITION;
var ANCHOR_TYPES = Object.keys(ANCHOR_POSITION);

function getDynamicPosition(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      selfWidth = _ref.selfWidth,
      selfHeight = _ref.selfHeight,
      anchor = _ref.anchor,
      _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? 0 : _ref$padding;
  var _ANCHOR_POSITION$anch = ANCHOR_POSITION[anchor],
      anchorX = _ANCHOR_POSITION$anch.x,
      anchorY = _ANCHOR_POSITION$anch.y;
  var top = y - anchorY * selfHeight;
  var bottom = top + selfHeight;
  var cutoffY = Math.max(0, padding - top) + Math.max(0, bottom - height + padding);

  if (cutoffY > 0) {
    var bestAnchorY = anchorY;
    var minCutoff = cutoffY;

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

  var xStep = 0.5;

  if (anchorY === 0.5) {
    anchorX = Math.floor(anchorX);
    xStep = 1;
  }

  var left = x - anchorX * selfWidth;
  var right = left + selfWidth;
  var cutoffX = Math.max(0, padding - left) + Math.max(0, right - width + padding);

  if (cutoffX > 0) {
    var bestAnchorX = anchorX;
    var _minCutoff = cutoffX;

    for (anchorX = 0; anchorX <= 1; anchorX += xStep) {
      left = x - anchorX * selfWidth;
      right = left + selfWidth;
      cutoffX = Math.max(0, padding - left) + Math.max(0, right - width + padding);

      if (cutoffX < _minCutoff) {
        _minCutoff = cutoffX;
        bestAnchorX = anchorX;
      }
    }

    anchorX = bestAnchorX;
  }

  return ANCHOR_TYPES.find(function (positionType) {
    var anchorPosition = ANCHOR_POSITION[positionType];
    return anchorPosition.x === anchorX && anchorPosition.y === anchorY;
  }) || anchor;
}
//# sourceMappingURL=dynamic-position.js.map