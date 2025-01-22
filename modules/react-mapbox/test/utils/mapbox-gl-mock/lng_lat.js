// Generated with
// flow-remove-types ./node_modules/mapbox-gl/src/geo/lng_lat.js

import {wrap} from './util.js';
import LngLatBounds from './lng_lat_bounds.js';

export const earthRadius = 6371008.8;

class LngLat {
  lng;
  lat;

  constructor(lng, lat) {
    if (isNaN(lng) || isNaN(lat)) {
      throw new Error(`Invalid LngLat object: (${lng}, ${lat})`);
    }
    this.lng = Number(lng);
    this.lat = Number(lat);
    if (this.lat > 90 || this.lat < -90) {
      throw new Error('Invalid LngLat latitude value: must be between -90 and 90');
    }
  }

  wrap() {
    return new LngLat(wrap(this.lng, -180, 180), this.lat);
  }

  toArray() {
    return [this.lng, this.lat];
  }

  toString() {
    return `LngLat(${this.lng}, ${this.lat})`;
  }

  distanceTo(lngLat) {
    const rad = Math.PI / 180;
    const lat1 = this.lat * rad;
    const lat2 = lngLat.lat * rad;
    const a =
      Math.sin(lat1) * Math.sin(lat2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.cos((lngLat.lng - this.lng) * rad);

    const maxMeters = earthRadius * Math.acos(Math.min(a, 1));
    return maxMeters;
  }

  toBounds(radius = 0) {
    const earthCircumferenceInMetersAtEquator = 40075017;
    const latAccuracy = (360 * radius) / earthCircumferenceInMetersAtEquator;
    const lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

    return new LngLatBounds(
      new LngLat(this.lng - lngAccuracy, this.lat - latAccuracy),
      new LngLat(this.lng + lngAccuracy, this.lat + latAccuracy)
    );
  }

  static convert(input) {
    if (input instanceof LngLat) {
      return input;
    }
    if (Array.isArray(input) && (input.length === 2 || input.length === 3)) {
      return new LngLat(Number(input[0]), Number(input[1]));
    }
    if (!Array.isArray(input) && typeof input === 'object' && input !== null) {
      return new LngLat(
        // flow can't refine this to have one of lng or lat, so we have to cast to any
        Number('lng' in input ? input.lng : input.lon),
        Number(input.lat)
      );
    }
    throw new Error(
      '`LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]'
    );
  }
}

export default LngLat;
