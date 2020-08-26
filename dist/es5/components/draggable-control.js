"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _baseControl = _interopRequireDefault(require("./base-control"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  draggable: _propTypes["default"].bool,
  onDrag: _propTypes["default"].func,
  onDragEnd: _propTypes["default"].func,
  onDragStart: _propTypes["default"].func,
  offsetLeft: _propTypes["default"].number,
  offsetTop: _propTypes["default"].number
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  draggable: false,
  offsetLeft: 0,
  offsetTop: 0
});

var DraggableControl = function (_BaseControl) {
  (0, _inherits2["default"])(DraggableControl, _BaseControl);

  var _super = _createSuper(DraggableControl);

  function DraggableControl() {
    var _this;

    (0, _classCallCheck2["default"])(this, DraggableControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      dragPos: null,
      dragOffset: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_dragEvents", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragStart", function (event) {
      var _this$props = _this.props,
          draggable = _this$props.draggable,
          captureDrag = _this$props.captureDrag;

      if (draggable || captureDrag) {
        event.stopPropagation();
      }

      if (!draggable) {
        return;
      }

      var dragPos = _this._getDragEventPosition(event);

      var dragOffset = _this._getDragEventOffset(event);

      _this.setState({
        dragPos: dragPos,
        dragOffset: dragOffset
      });

      _this._setupDragEvents();

      var onDragStart = _this.props.onDragStart;

      if (onDragStart && dragOffset) {
        var callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = _this._getDragLngLat(dragPos, dragOffset);
        onDragStart(callbackEvent);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDrag", function (event) {
      event.stopPropagation();

      var dragPos = _this._getDragEventPosition(event);

      _this.setState({
        dragPos: dragPos
      });

      var onDrag = _this.props.onDrag;
      var dragOffset = _this.state.dragOffset;

      if (onDrag && dragOffset) {
        var callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = _this._getDragLngLat(dragPos, dragOffset);
        onDrag(callbackEvent);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragEnd", function (event) {
      var _this$state = _this.state,
          dragPos = _this$state.dragPos,
          dragOffset = _this$state.dragOffset;
      event.stopPropagation();

      _this.setState({
        dragPos: null,
        dragOffset: null
      });

      _this._removeDragEvents();

      var onDragEnd = _this.props.onDragEnd;

      if (onDragEnd && dragPos && dragOffset) {
        var callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = _this._getDragLngLat(dragPos, dragOffset);
        onDragEnd(callbackEvent);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragCancel", function (event) {
      event.stopPropagation();

      _this.setState({
        dragPos: null,
        dragOffset: null
      });

      _this._removeDragEvents();
    });
    return _this;
  }

  (0, _createClass2["default"])(DraggableControl, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(DraggableControl.prototype), "componentWillUnmount", this).call(this);

      this._removeDragEvents();
    }
  }, {
    key: "_setupDragEvents",
    value: function _setupDragEvents() {
      var eventManager = this._context.eventManager;

      if (!eventManager) {
        return;
      }

      this._dragEvents = {
        panmove: this._onDrag,
        panend: this._onDragEnd,
        pancancel: this._onDragCancel
      };
      eventManager.on(this._dragEvents);
    }
  }, {
    key: "_removeDragEvents",
    value: function _removeDragEvents() {
      var eventManager = this._context.eventManager;

      if (!eventManager || !this._dragEvents) {
        return;
      }

      eventManager.off(this._dragEvents);
      this._dragEvents = null;
    }
  }, {
    key: "_getDragEventPosition",
    value: function _getDragEventPosition(event) {
      var _event$offsetCenter = event.offsetCenter,
          x = _event$offsetCenter.x,
          y = _event$offsetCenter.y;
      return [x, y];
    }
  }, {
    key: "_getDragEventOffset",
    value: function _getDragEventOffset(event) {
      var _event$center = event.center,
          x = _event$center.x,
          y = _event$center.y;
      var container = this._containerRef.current;

      if (container) {
        var rect = container.getBoundingClientRect();
        return [rect.left - x, rect.top - y];
      }

      return null;
    }
  }, {
    key: "_getDraggedPosition",
    value: function _getDraggedPosition(dragPos, dragOffset) {
      return [dragPos[0] + dragOffset[0], dragPos[1] + dragOffset[1]];
    }
  }, {
    key: "_getDragLngLat",
    value: function _getDragLngLat(dragPos, dragOffset) {
      var _this$props2 = this.props,
          offsetLeft = _this$props2.offsetLeft,
          offsetTop = _this$props2.offsetTop;

      var _this$_getDraggedPosi = this._getDraggedPosition(dragPos, dragOffset),
          _this$_getDraggedPosi2 = (0, _slicedToArray2["default"])(_this$_getDraggedPosi, 2),
          x = _this$_getDraggedPosi2[0],
          y = _this$_getDraggedPosi2[1];

      return this._context.viewport.unproject([x - offsetLeft, y - offsetTop]);
    }
  }]);
  return DraggableControl;
}(_baseControl["default"]);

exports["default"] = DraggableControl;
(0, _defineProperty2["default"])(DraggableControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(DraggableControl, "defaultProps", defaultProps);
//# sourceMappingURL=draggable-control.js.map