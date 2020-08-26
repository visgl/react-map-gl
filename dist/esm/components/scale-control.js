import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import PropTypes from 'prop-types';
import BaseControl from './base-control';
import mapboxgl from '../utils/mapboxgl';
var propTypes = Object.assign({}, BaseControl.propTypes, {
  maxWidth: PropTypes.number,
  unit: PropTypes.oneOf(['imperial', 'metric', 'nautical'])
});
var defaultProps = Object.assign({}, BaseControl.defaultProps, {
  maxWidth: 100,
  unit: 'metric'
});

var ScaleControl = function (_BaseControl) {
  _inherits(ScaleControl, _BaseControl);

  var _super = _createSuper(ScaleControl);

  function ScaleControl() {
    var _this;

    _classCallCheck(this, ScaleControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_control", null);

    _defineProperty(_assertThisInitialized(_this), "_mapboxScaleControl", null);

    return _this;
  }

  _createClass(ScaleControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var mapboxScaleControl = new mapboxgl.ScaleControl();
      mapboxScaleControl._map = this._context.map;
      mapboxScaleControl._container = this._containerRef.current;
      this._mapboxScaleControl = mapboxScaleControl;

      this._update();
    }
  }, {
    key: "_update",
    value: function _update() {
      var mapboxScaleControl = this._mapboxScaleControl;

      if (mapboxScaleControl) {
        mapboxScaleControl.options = this.props;

        mapboxScaleControl._onMove();
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      this._control = this._control || React.createElement("div", {
        ref: this._containerRef,
        className: "mapboxgl-ctrl mapboxgl-ctrl-scale"
      });

      this._update();

      return this._control;
    }
  }]);

  return ScaleControl;
}(BaseControl);

_defineProperty(ScaleControl, "propTypes", propTypes);

_defineProperty(ScaleControl, "defaultProps", defaultProps);

export { ScaleControl as default };
//# sourceMappingURL=scale-control.js.map