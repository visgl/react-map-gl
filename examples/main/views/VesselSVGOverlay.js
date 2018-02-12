import React, {Component} from 'react'
import {SVGOverlay} from 'react-map-gl' 
import { arrow } from '../../data/boatPath';
const helpers = require('../../data/custom-overlay')

export class VesselSVGOverlay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: helpers.generateLocations(100)
    }
    this._redraw = this._redraw.bind(this)
  }

  _redraw (opt) {
    const { locations } = this.state
    if (!locations || locations.length === 0) {
      return <g></g>
    }

    const vessels = locations.map((location, i) => {
      const point = opt.project([location.longitude, location.latitude])      
      return <path
        key={ i }
        style={ {fill: 'rgba(0,0,0,0)', stroke: '#1FBAD6', fill: 'solid'} }
        d={arrow}
        transform={`translate(${point}),rotate(${String(location.rotation)}),scale(0.02)`}
        onClick={ () => {
          const windowAlert = window.alert;
          windowAlert(`Vessel ${i}`);
        } }/>
    })

    return (
      <g style={ {
        pointerEvents: 'all',
        cursor: 'pointer'
      } }>
        {vessels.map(v => v)}
      </g>
    );
  }

  render () {
    return (
      <SVGOverlay redraw={this._redraw} />
    )
  }
}

export default VesselSVGOverlay
