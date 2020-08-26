var supported;
export function isGeolocationSupported() {
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