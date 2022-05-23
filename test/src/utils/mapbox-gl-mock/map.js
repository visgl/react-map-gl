// Adapted from https://github.com/mapbox/mapbox-gl-js-mock/
// BSD 3-Clause License
// Copyright (c) 2017, Mapbox
import LngLat from './lng_lat';
import {Evented, Event} from './evented';
import TaskQueue from './task_queue';
import Transform from './transform';
import {extend, number} from './util';
import Style from './style';

const defaultOptions = {
  doubleClickZoom: true
};

function functor(x) {
  return function () {
    return x;
  };
}

export default class Map extends Evented {
  constructor(options) {
    super();

    this.options = extend(options || {}, defaultOptions);
    this._events = {};
    this.style = new Style();
    this._isMoving = false;
    this._controls = [];
    this._markers = [];
    this._renderTaskQueue = new TaskQueue();

    this.transform = new Transform();
    this.transform.center = LngLat.convert(this.options.center || [0, 0]);
    this.transform.zoom = this.options.zoom || 0;
    this.transform.pitch = this.options.pitch || 0;
    this.transform.bearing = this.options.bearing || 0;
    this.painter = {transform: this.transform};

    setTimeout(() => {
      this.style._loaded = true;
      this.fire(new Event('styledata'));
      this.fire(new Event('load'));
    }, 0);
  }

  addControl(control) {
    this._controls.push(control);
    control.onAdd(this);
  }
  removeControl(control) {
    const i = this._controls.indexOf(control);
    if (i >= 0) {
      this._controls.splice(i, 1);
      control.onRemove(this);
    }
  }

  getStyle() {
    return this.style.serialize();
  }

  _addMarker(marker) {
    this._markers.push(marker);
  }
  _removeMarker(marker) {
    const i = this._markers.indexOf(marker);
    if (i >= 0) {
      this._markers.splice(i, 1);
    }
  }

  getContainer() {
    const container = {
      parentNode: container,
      appendChild() {},
      removeChild() {},
      getElementsByClassName() {
        return [container];
      },
      addEventListener(name, handle) {},
      removeEventListener() {},
      classList: {
        add() {},
        remove() {}
      }
    };

    return container;
  }

  loaded() {
    return true;
  }

  addSource(name, source) {
    this.style.addSource(name, source);
    if (source.type === 'geojson') {
      const e = {
        type: 'data',
        sourceDataType: 'metadata',
        sourceId: name,
        isSourceLoaded: true,
        dataType: 'source',
        source
      };
      this.fire(new Event('data', e));
    }
  }

  getSource(name) {
    const source = this.style.getSource(name);
    if (source) {
      return {
        getData: () => source.data,
        setData: data => {
          source.data = data;
          if (source.type === 'geojson') {
            const e = {
              type: 'data',
              sourceDataType: 'content',
              sourceId: name,
              isSourceLoaded: true,
              dataType: 'source',
              source
            };
            this.fire(new Event('data', e));
          }
        },
        loadTile() {}
      };
    }
    return null;
  }

  removeSource(name) {
    this.style.removeSource(name);
  }

  setStyle(style) {
    this.style = new Style();
    setTimeout(() => {
      this.style._loaded = true;
      this.fire(new Event('styledata'));
    }, 0);
  }

  addLayer(layer, before) {
    this.style.addLayer(layer, before);
  }
  moveLayer(layerId, beforeId) {}
  removeLayer(layerId) {
    this.style.removeLayer(layerId);
  }
  getLayer(layerId) {
    return this.style.getLayer(layerId);
  }
  setLayoutProperty(layerId, name, value) {
    this.style.setLayoutProperty(layerId, name, value);
  }
  setPaintProperty(layerId, name, value) {
    this.style.setPaintProperty(layerId, name, value);
  }

  doubleClickZoom = {
    disable() {},
    enable() {}
  };

  boxZoom = {
    disable() {},
    enable() {}
  };

  dragPan = {
    disable() {},
    enable() {}
  };

  project() {}

  queryRenderedFeatures(pointOrBox, queryParams) {
    return [];
  }

  getCenter() {
    return this.transform.center;
  }
  getZoom() {
    return this.transform.zoom;
  }
  getBearing() {
    return this.transform.bearing;
  }
  getPitch() {
    return this.transform.pitch;
  }
  getPadding() {
    return this.transform.padding;
  }

  easeTo({center: [lng, lat], zoom}) {
    const FRAMES = 5;
    let f = 0;

    this._isMoving = true;
    this.fire(new Event('movestart'));

    const startLng = this.getCenter().lng;
    const startLat = this.getCenter().lat;
    const startZoom = this.getZoom();

    const onFrame = () => {
      f++;

      this.transform.center = LngLat.convert([
        number(startLng, lng, f / FRAMES),
        number(startLat, lat, f / FRAMES)
      ]);
      this.transform.zoom = number(startZoom, zoom, f / FRAMES);

      this.fire(new Event('move'));

      if (f < FRAMES) {
        this._renderTaskQueue.add(onFrame);
        this.triggerRepaint();
      } else {
        this.fire(new Event('moveend'));
        this._isMoving = false;
      }
    };

    this._renderTaskQueue.add(onFrame);
    this.triggerRepaint();
  }

  isMoving() {
    return this._isMoving;
  }

  triggerRepaint() {
    setTimeout(() => this._render(), 0);
  }

  _render() {
    this._renderTaskQueue.run();
    this.fire(new Event('render'));
  }

  remove() {
    this._events = [];
    this.sources = [];
  }
}
