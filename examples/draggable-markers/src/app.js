import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';

import ControlPanel from './control-panel';
import Pin from './pin';

const TOKEN = ''; // Set your mapbox token here

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100
  });
  const [events, logEvents] = useState({});

  const onMarkerDragStart = event => {
    logEvents({...events, onDragStart: event.lngLat});
  };

  const onMarkerDrag = event => {
    logEvents({...events, onDrag: event.lngLat});
  };

  const onMarkerDragEnd = event => {
    logEvents({...events, onDragEnd: event.lngLat});
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });
  };

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={v => setViewport(v)}
        mapboxApiAccessToken={TOKEN}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </MapGL>
      <ControlPanel events={events} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
