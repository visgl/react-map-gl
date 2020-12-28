import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import BartMap from './bart-map';

const LIGHT_STYLE = 'mapbox://styles/mapbox/light-v9';
const DARK_STYLE = 'mapbox://styles/mapbox/dark-v9';

export default function App() {
  const [showMap, setShowMap] = useState(true);
  const [mapStyle, setMapStyle] = useState(LIGHT_STYLE);

  const toggleMap = () => {
    setShowMap(!showMap);

    if (showMap) {
      setMapStyle(mapStyle === LIGHT_STYLE ? DARK_STYLE : LIGHT_STYLE);
    }
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleMap}>
        Toggle Map
      </button>
      {showMap && <BartMap mapStyle={mapStyle} />}
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
