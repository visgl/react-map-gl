import * as React from 'react';

import CITIES from '../../.data/cities.json';

function ControlPanel(props) {
  return (
    <div className="control-panel">
      <h3>Camera Transition</h3>
      <p>Smooth animate of the viewport.</p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/6.1-release/examples/viewport-animation"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
      <hr />

      {CITIES.filter(city => city.state === 'California').map((city, index) => (
        <div key={`btn-${index}`} className="input">
          <input
            type="radio"
            name="city"
            id={`city-${index}`}
            defaultChecked={city.city === 'San Francisco'}
            onClick={() => props.onSelectCity(city)}
          />
          <label htmlFor={`city-${index}`}>{city.city}</label>
        </div>
      ))}
    </div>
  );
}

export default React.memo(ControlPanel);
