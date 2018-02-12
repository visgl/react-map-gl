import React, {Component} from 'react';
import MapGL, {NavigationControl} from 'react-map-gl';
import VesselSVGOverlay from './VesselSVGOverlay'

export class Vessels extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 0,
        longitude: 0,
        zoom: 1
      }
    }
    this._onViewportChange = this._onViewportChange.bind(this)
  }

  _onViewportChange(viewport) {
    this.setState({viewport});
  }

  render() {
    // TODO: create extensible <Sidebar position='left' modules={Array[Object]} ... />
    // Shape of Module definitions: { name, position, node, icon, id }

    // TODO: create extensible <MiniMap position='bottomRight' modules={Array[Object]} ... />
    // Shape of modules: { name, position, icon, node, id } lookup componentConfig based on id from Redux Store

    // Q: is store available in component constructor? If not, initialise with defaults
    // and use componentWillReceiveProps to configure component
    
    const viewport = {...this.state.viewport, ...this.props};
    return (
      <MapGL
        { ...viewport }
        scrollZoom={false}
        onViewportChange={ this._onViewportChange }
        minZoom={1}
      >
        <div
          className="nav"
          style={{
            margin: '6px',
            position: 'absolute',
            bottom: '25px',
            right: '0'
        }}>
          <NavigationControl onViewportChange={this._onViewportChange} />
        </div>
        <VesselSVGOverlay redraw={ this._redrawCanvasOverlay }/>
      </MapGL>
    );
  }
}

export default Vessels
