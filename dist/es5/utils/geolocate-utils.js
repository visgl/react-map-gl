"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGeolocationSupported = isGeolocationSupported;
var supported;

function isGeolocationSupported() {
  if (supported !== undefined) {
    return Promise.resolve(supported);
  }

  if (window.navigator.permissions !== undefined) {
    return window.navigator.permissions.query({
      name: 'geolocation'
    }).then(function (p) {
      supported = p.state !== 'denied';
      return supported;
    });
  }

  supported = Boolean(window.navigator.geolocation);
  return Promise.resolve(supported);
}
//# sourceMappingURL=geolocate-utils.js.map