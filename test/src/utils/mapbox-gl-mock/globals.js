export function supported() {
  return true;
}

let rtlTextPlugin = '';
let baseApiUrl = 'https://api.mapbox.com';

export function getRTLTextPluginStatus() {
  return rtlTextPlugin ? 'deferred' : 'unavailable';
}

export function setRTLTextPlugin(url) {
  rtlTextPlugin = url;
}

export default {
  supported,
  getRTLTextPluginStatus,
  setRTLTextPlugin,
  get baseApiUrl() {
    return baseApiUrl;
  },
  set baseApiUrl(value) {
    baseApiUrl = value;
  }
};
