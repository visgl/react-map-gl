"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapContext = _interopRequireDefault(require("./map-context"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = {
  captureScroll: _propTypes["default"].bool,
  captureDrag: _propTypes["default"].bool,
  captureClick: _propTypes["default"].bool,
  captureDoubleClick: _propTypes["default"].bool
};
var defaultProps = {
  captureScroll: false,
  captureDrag: true,
  captureClick: true,
  captureDoubleClick: true
};

var BaseControl = function (_PureComponent) {
  (0, _inherits2["default"])(BaseControl, _PureComponent);

  var _super = _createSuper(BaseControl);

  function BaseControl() {
    var _this;

    (0, _classCallCheck2["default"])(this, BaseControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_context", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_events", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_containerRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onScroll", function (evt) {
      if (_this.props.captureScroll) {
        evt.stopPropagation();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragStart", function (evt) {
      if (_this.props.captureDrag) {
        evt.stopPropagation();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDblClick", function (evt) {
      if (_this.props.captureDoubleClick) {
        evt.stopPropagation();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (evt) {
      if (_this.props.captureClick) {
        evt.stopPropagation();
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(BaseControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var ref = this._containerRef.current;

      if (!ref) {
        return;
      }

      var eventManager = this._context.eventManager;

      if (eventManager) {
        this._events = {
          wheel: this._onScroll,
          panstart: this._onDragStart,
          anyclick: this._onClick,
          click: this._onClick,
          dblclick: this._onDblClick
        };
        eventManager.watch(this._events, ref);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var eventManager = this._context.eventManager;

      if (eventManager && this._events) {
        eventManager.off(this._events);
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      throw new Error('_render() not implemented');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(_mapContext["default"].Consumer, null, function (context) {
        _this2._context = context;
        return _this2._render();
      });
    }
  }]);
  return BaseControl;
}(React.PureComponent);

exports["default"] = BaseControl;
(0, _defineProperty2["default"])(BaseControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(BaseControl, "defaultProps", defaultProps);
//# sourceMappingURL=base-control.js.map