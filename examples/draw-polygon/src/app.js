import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import {Editor, EditorModes} from 'react-map-gl-draw';

import ControlPanel from './control-panel';
import {getFeatureStyle, getEditHandleStyle} from './style';

const TOKEN = ''; // Set your mapbox token here

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: -91.874,
        latitude: 42.76,
        zoom: 12
      },
      mode: EditorModes.READ_ONLY,
      features: [],
      selectedFeatureId: null
    };
    this._mapRef = null;
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _onSelect = ({selectedFeatureId}) => {
    this.setState({selectedFeatureId});
  };

  _onDelete = () => {
    const selectedIndex = this._getSelectedFeatureIndex();
    if (selectedIndex >= 0) {
      const newFeatures = [...this.state.features];
      newFeatures.splice(selectedIndex, 1);
      this.setState({features: newFeatures, selectedFeatureId: null});
    }
  };

  _onUpdate = features => {
    this.setState({
      features,
      mode: EditorModes.EDITING
    });
  };

  _getSelectedFeatureIndex = () => {
    const {selectedFeatureId} = this.state;
    if (selectedFeatureId === null || selectedFeatureId === undefined) {
      return -1;
    }

    return this.state.features.findIndex(f => f.properties.id === selectedFeatureId);
  };

  _renderDrawTools = () => {
    // copy from mapbox
    return (
      <div className="mapboxgl-ctrl-top-right">
        <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
            title="Polygon tool (p)"
            onClick={() => this.setState({mode: EditorModes.DRAW_POLYGON})}
          />
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
            title="Delete"
            onClick={this._onDelete}
          />
        </div>
      </div>
    );
  };

  _renderControlPanel = () => {
    const features = this.state.features;
    let featureIndex = this._getSelectedFeatureIndex();
    if (featureIndex < 0) {
      featureIndex = features.length - 1;
    }
    const polygon = features && features.length ? features[featureIndex] : null;
    return <ControlPanel polygon={polygon} />;
  };

  render() {
    const {viewport, mode, selectedFeatureId, features} = this.state;
    return (
      <MapGL
        {...viewport}
        ref={_ => (this._mapRef = _)}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={this._updateViewport}
      >
        <Editor
          style={{width: '100%', height: '100%'}}
          clickRadius={12}
          mode={mode}
          features={features}
          selectedFeatureId={selectedFeatureId}
          onSelect={this._onSelect}
          onUpdate={this._onUpdate}
          getEditHandleShape={'circle'}
          getFeatureStyle={getFeatureStyle}
          getEditHandleStyle={getEditHandleStyle}
        />
        {this._renderDrawTools()}
        {this._renderControlPanel()}
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
