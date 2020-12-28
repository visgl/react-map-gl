import * as React from 'react';
import {useState} from 'react';
import MapGL, {Marker} from 'react-map-gl';

import bartStations from '../../.data/bart-station.json';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function BartMap(props) {
  const [viewport, setViewport] = useState({
    latitude: 37.73,
    longitude: -122.36,
    zoom: 11,
    bearing: 0,
    pitch: 50
  });

  // eslint-disable-next-line
  const onMapLoad = event => console.log(event);

  return (
    <MapGL
      {...viewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle={props.mapStyle}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
      onLoad={onMapLoad}
      reuseMaps
    >
      {bartStations.map(({name, coordinates}, i) => (
        <Marker key={i} longitude={coordinates[0]} latitude={coordinates[1]}>
          <div className="station">
            <span>{name}</span>
          </div>
        </Marker>
      ))}
    </MapGL>
  );
}
