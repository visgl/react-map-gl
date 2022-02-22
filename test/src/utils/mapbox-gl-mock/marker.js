import {Evented} from './evented';
import LngLat from './lng_lat';

export default class Marker extends Evented {
  constructor(opts) {
    super();
    this.options = opts;

    this._map = null;
    this._lngLat = null;
    this._popup = null;
    this._element = opts.element || {addEventListener: () => {}};
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
    return this._element;
  }

  getLngLat() {
    return this._lngLat;
  }
  setLngLat(value) {
    this._lngLat = LngLat.convert(value);
    return this;
  }
  getOffset() {
    return this.options.offset;
  }
  setOffset(value) {
    this.options.offset = value;
    return this;
  }
  isDraggable() {
    return this.options.draggable;
  }
  setDraggable(value) {
    this.options.draggable = value;
    return this;
  }
  getRotation() {
    return this.options.rotation;
  }
  setRotation(value) {
    this.options.rotation = value;
    return this;
  }
  getRotationAlignment() {
    return this.options.rotationAlignment;
  }
  setRotationAlignment(value) {
    this.options.rotationAlignment = value;
    return this;
  }
  getPitchAlignment() {
    return this.options.pitchAlignment;
  }
  setPitchAlignment(value) {
    this.options.pitchAlignment = value;
    return this;
  }
  getPopup() {
    return this._popup;
  }
  setPopup(value) {
    this._popup = value;
    return this;
  }
}
