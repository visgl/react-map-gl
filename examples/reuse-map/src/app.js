import React, {Component} from 'react';
import {render} from 'react-dom';
import BartMap from './bart-map';

const LIGHT_STYLE = "mapbox://styles/mapbox/light-v9";
const DARK_STYLE = "mapbox://styles/mapbox/dark-v9";

export default class App extends Component {

  state = {
    showMap: true,
    mapStyleLight: true
  };

  _toggleMap() {
    let {showMap, mapStyleLight} = this.state;

    showMap = !this.state.showMap;
    if (showMap) {
      mapStyleLight = !mapStyleLight;
    }

    this.setState({
      showMap,
      mapStyleLight
    });
  }

  render() {
    const {showMap, mapStyleLight} = this.state;
    const mapStyle = mapStyleLight ? LIGHT_STYLE : DARK_STYLE;
    if (showMap) {
      console.warn(mapStyle);
    }
    return (
      <div style={{height: '100%'}}>
        <button style={{position: 'fixed', zIndex: 1}}
          onClick={this._toggleMap.bind(this)}>
          Toggle Map
        </button>
        {showMap && <BartMap mapStyle={mapStyle}/>}
      </div>
    );
  }

}

export function renderToDom(container) {
  render(<App/>, container);
}
