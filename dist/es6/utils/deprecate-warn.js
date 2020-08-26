const DEPRECATED_PROPS = [{
  old: 'onChangeViewport',
  new: 'onViewportChange'
}, {
  old: 'perspectiveEnabled',
  new: 'dragRotate'
}, {
  old: 'onHoverFeatures',
  new: 'onHover'
}, {
  old: 'onClickFeatures',
  new: 'onClick'
}, {
  old: 'touchZoomRotate',
  new: 'touchZoom, touchRotate'
}, {
  old: 'mapControls',
  new: 'controller'
}];

function getDeprecatedText(name) {
  return "react-map-gl: `".concat(name, "` is removed.");
}

function getNewText(name) {
  return "Use `".concat(name, "` instead.");
}

export default function checkDeprecatedProps(props = {}) {
  DEPRECATED_PROPS.forEach(depProp => {
    if (props.hasOwnProperty(depProp.old)) {
      let warnMessage = getDeprecatedText(depProp.old);

      if (depProp.new) {
        warnMessage = "".concat(warnMessage, " ").concat(getNewText(depProp.new));
      }

      console.warn(warnMessage);
    }
  });
}
//# sourceMappingURL=deprecate-warn.js.map