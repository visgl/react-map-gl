// Adapted from https://github.com/mapbox/mapbox-gl-js-mock/
// BSD 3-Clause License
// Copyright (c) 2017, Mapbox

export default class Style {
  constructor() {
    this.stylesheet = {
      owner: 'mapbox',
      id: 'testmap'
    };

    this._loaded = false;
    this._light = null;
    this._fog = null;
    this._terrain = null;

    this._sources = {};
    this._layers = [];
  }

  loaded() {
    return this._loaded;
  }

  serialize() {
    const style = {sources: this._sources, layers: this._layers};
    // deep clone
    return JSON.parse(JSON.stringify(style));
  }

  _checkLoaded() {
    if (!this._loaded) {
      throw new Error('style is not done loading');
    }
  }

  setLight(value) {
    this._checkLoaded();
    this._light = value;
  }
  setFog(value) {
    this._checkLoaded();
    this._fog = value;
  }
  setTerrain(value) {
    this._checkLoaded();
    this._terrain = value;
  }

  addSource(name, source) {
    this._checkLoaded();
    if (name in this._sources) {
      throw new Error('Source with the same id already exists');
    }
    this._sources[name] = source;
  }

  getSource(name) {
    return this._sources[name];
  }

  removeSource(name) {
    this._checkLoaded();
    if (!(name in this._sources)) {
      throw new Error('No source with this id');
    }
    for (const layer of this._layers) {
      if (layer.source === name) {
        throw new Error('Source cannot be removed while layer is using it.');
      }
    }
    delete this._sources[name];
  }

  addLayer(layer, before) {
    this._checkLoaded();
    if (this._layers.some(l => l.id === layer.id)) {
      throw new Error('Layer with the same id already exists');
    }
    if (!(layer.source in this._sources)) {
      throw new Error('Layer source does not exist');
    }
    let i = -1;
    if (before) {
      i = this._layers.findIndex(l => l.id === before);
    }
    if (i >= 0) {
      this._layers.splice(i, 0, layer);
    } else {
      this._layers.push(layer);
    }
  }

  removeLayer(layerId) {
    this._checkLoaded();
    const i = this._layers.findIndex(l => l.id === layerId);
    if (i < 0) {
      throw new Error('No layer with this id');
    }
    this._layers.splice(i, 1);
  }

  getLayer(layerId) {
    return this._layers.find(l => l.id === layerId);
  }

  setLayoutProperty(layerId, name, value) {
    this._checkLoaded();
    const layer = this.getLayer(layerId);
    if (!layer) {
      throw new Error('No layer with this id');
    }
    layer.layout = layer.layout || {};
    layer.layout[name] = value;
  }

  setPaintProperty(layerId, name, value) {
    this._checkLoaded();
    const layer = this.getLayer(layerId);
    if (!layer) {
      throw new Error('No layer with this id');
    }
    layer.paint = layer.paint || {};
    layer.paint[name] = value;
  }
}
