"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = checkDeprecatedProps;
var DEPRECATED_PROPS = [{
  old: 'onChangeViewport',
  "new": 'onViewportChange'
}, {
  old: 'perspectiveEnabled',
  "new": 'dragRotate'
}, {
  old: 'onHoverFeatures',
  "new": 'onHover'
}, {
  old: 'onClickFeatures',
  "new": 'onClick'
}, {
  old: 'touchZoomRotate',
  "new": 'touchZoom, touchRotate'
}, {
  old: 'mapControls',
  "new": 'controller'
}];

function getDeprecatedText(name) {
  return "react-map-gl: `".concat(name, "` is removed.");
}

function getNewText(name) {
  return "Use `".concat(name, "` instead.");
}

function checkDeprecatedProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  DEPRECATED_PROPS.forEach(function (depProp) {
    if (props.hasOwnProperty(depProp.old)) {
      var warnMessage = getDeprecatedText(depProp.old);

      if (depProp["new"]) {
        warnMessage = "".concat(warnMessage, " ").concat(getNewText(depProp["new"]));
      }

      console.warn(warnMessage);
    }
  });
}
//# sourceMappingURL=deprecate-warn.js.map