import {Evented} from './evented';
import LngLat from './lng_lat';

export default class Popup extends Evented {
  constructor(opts) {
    super();
    this.options = opts;

    this._lngLat = null;
    this._content = null;
    this._classList = new Set(opts.className ? opts.className.trim().split(/\s+/) : []);
  }

  addTo(map) {
    this._map = map;
    map._addMarker(this);
    return this;
  }
  remove() {
    this._map._removeMarker(this);
    this._map = null;
  }
  getElement() {
    return null;
  }

  isOpen() {
    return this._map !== null;
  }

  getLngLat() {
    return this._lngLat;
  }
  setLngLat(value) {
    this._lngLat = LngLat.convert(value);
    return this;
  }

  setText(text) {
    this._content = text;
    return this;
  }
  setHTML(html) {
    this._content = html;
    return this;
  }
  setDOMContent(htmlNode) {
    this._content = htmlNode;
    return this;
  }
  getMaxWidth() {
    return this.options.maxWidth;
  }
  setMaxWidth(value) {
    this.options.maxWidth = value;
    return this;
  }
  setOffset(value) {
    this.options.offset = value;
    return this;
  }

  addClassName(className) {
    this._classList.add(className);
  }
  removeClassName(className) {
    this._classList.remove(className);
  }
}
