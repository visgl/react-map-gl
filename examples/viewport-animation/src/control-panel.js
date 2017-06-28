import React, {PureComponent} from 'react';

import CITIES from '../../data/cities.json';

export default class ControlPanel extends PureComponent {

  _renderButton = (city, index) => {
    return (
      <div key={`btn-${index}`} className="input" >
        <input type="radio" name="city"
          id={`city-${index}`}
          defaultChecked={city.city === 'San Francisco'}
          onChange={() => this.props.onViewportChange(city)} />
        <label htmlFor={`city-${index}`}>{city.city}</label>
      </div>
    );
  };

  render() {
    return (
      <div className="options-panel" tabIndex="0">
        <h3>Camera Transition</h3>
        <p>Smooth animate of the viewport.</p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/master/examples/viewport-animation" target="_new">View Code ↗</a>
        </div>
        <hr />
        
        { CITIES.filter(city => city.state === 'California').map(this._renderButton) }
      </div>
    );
  }
}
