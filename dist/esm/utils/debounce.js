export default function debounce(func, delay) {
  var _this;

  var _arguments;

  var timeout;

  var executeNow = function executeNow() {
    timeout = null;
    return func.apply(_this, _arguments);
  };

  return function () {
    _this = this;
    _arguments = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(executeNow, delay);
  };
}
//# sourceMappingURL=debounce.js.map