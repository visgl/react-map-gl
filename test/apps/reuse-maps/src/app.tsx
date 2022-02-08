import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import Map from 'react-map-gl';

const TOKEN = ''; // Set your mapbox token here

const CONFIGS = [
  {
    style: {width: '100%', height: '100%'},
    mapStyle: 'mapbox://styles/mapbox/dark-v9',
    initialViewState: {
      longitude: -122.4,
      latitude: 37.8,
      zoom: 12
    }
  },
  {
    style: {width: 400, height: 300, margin: 100},
    mapStyle: 'mapbox://styles/mapbox/light-v9',
    initialViewState: {
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }
  },
  {
    style: {width: '50vw', height: '100vh', marginLeft: '50vw'},
    mapStyle: 'mapbox://styles/mapbox/streets-v9',
    longitude: -70.4,
    latitude: 40.1,
    zoom: 6
  }
];

export default function App() {
  const [key, setKey] = useState(0);
  const [showMap, setShowMap] = useState(true);

  const onClickBtn = () => {
    if (!showMap) {
      setKey((key + 1) % CONFIGS.length);
    }
    setShowMap(!showMap);
  };

  const onLoad = () => console.log(key, 'loaded'); // eslint-disable-line

  return (
    <>
      {showMap && <Map {...CONFIGS[key]} reuseMaps mapboxAccessToken={TOKEN} onLoad={onLoad} />}
      <button onClick={onClickBtn}>switch</button>
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
