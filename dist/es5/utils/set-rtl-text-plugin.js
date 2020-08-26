"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mapboxgl = _interopRequireDefault(require("./mapboxgl"));

var setRTLTextPlugin = _mapboxgl["default"] ? _mapboxgl["default"].setRTLTextPlugin : function () {};
var _default = setRTLTextPlugin;
exports["default"] = _default;
//# sourceMappingURL=set-rtl-text-plugin.js.map