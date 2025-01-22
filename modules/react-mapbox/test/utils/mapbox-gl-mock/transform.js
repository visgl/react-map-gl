import {wrap, clamp} from './util';

import LngLat from './lng_lat';
import EdgeInsets from './edge_insets';

export default class Transform {
  constructor() {
    this.minZoom = 0;
    this.maxZoom = 22;
    this.minPitch = 0;
    this.maxPitch = 60;
    this.minLat = -85.051129;
    this.maxLat = 85.051129;
    this.minLng = -180;
    this.maxLng = 180;
    this.width = 1;
    this.height = 1;
    this._center = new LngLat(0, 0);
    this._zoom = 0;
    this.angle = 0;
    this._pitch = 0;
    this._edgeInsets = new EdgeInsets();
  }

  get bearing() {
    return wrap(this.rotation, -180, 180);
  }

  set bearing(bearing) {
    this.rotation = bearing;
  }

  get rotation() {
    return (-this.angle / Math.PI) * 180;
  }

  set rotation(rotation) {
    const b = (-rotation * Math.PI) / 180;
    if (this.angle === b) return;
    this.angle = b;
  }

  get pitch() {
    return (this._pitch / Math.PI) * 180;
  }
  set pitch(pitch) {
    const p = (clamp(pitch, this.minPitch, this.maxPitch) / 180) * Math.PI;
    if (this._pitch === p) return;
    this._pitch = p;
  }

  get zoom() {
    return this._zoom;
  }
  set zoom(zoom) {
    const z = Math.min(Math.max(zoom, this.minZoom), this.maxZoom);
    if (this._zoom === z) return;
    this._zoom = z;
  }

  get center() {
    return this._center;
  }
  set center(center) {
    if (center.lat === this._center.lat && center.lng === this._center.lng) return;
    this._center = center;
  }

  get padding() {
    return this._edgeInsets.toJSON();
  }
  set padding(padding) {
    if (this._edgeInsets.equals(padding)) return;
    // Update edge-insets inplace
    this._edgeInsets.interpolate(this._edgeInsets, padding, 1);
  }

  clone() {
    const that = new Transform();
    that.center = this.center;
    that.zoom = this.zoom;
    that.bearing = this.bearing;
    that.pitch = this.pitch;
    that.padding = this.padding;
    return that;
  }

  isPaddingEqual(padding) {
    return this._edgeInsets.equals(padding);
  }
}
