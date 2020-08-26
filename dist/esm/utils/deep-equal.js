import _typeof from "@babel/runtime/helpers/esm/typeof";
export default function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  } else if (Array.isArray(b)) {
    return false;
  }

  if (_typeof(a) === 'object' && _typeof(b) === 'object') {
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (var _i = 0, _aKeys = aKeys; _i < _aKeys.length; _i++) {
      var key = _aKeys[_i];

      if (!b.hasOwnProperty(key)) {
        return false;
      }

      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}
//# sourceMappingURL=deep-equal.js.map