// Adapted from https://github.com/mapbox/mapbox-gl-js-mock/
// BSD 3-Clause License
// Copyright (c) 2017, Mapbox

class FakeControl {
  constructor(opts) {
    this.options = opts;
  }
  addTo() {}
  onAdd() {}
  onRemove() {}
  on() {}
}

import Map from './map';
import LngLat from './lng_lat';
import LngLatBounds from './lng_lat_bounds';
import globals from './globals';
import Marker from './marker';
import Popup from './popup';

export default {
  ...globals,
  Map,
  LngLat,
  LngLatBounds,
  Marker,
  Popup,
  NavigationControl: FakeControl,
  ScaleControl: FakeControl,
  AttributionControl: FakeControl,
  GeolocateControl: FakeControl,
  FullscreenControl: FakeControl
};
