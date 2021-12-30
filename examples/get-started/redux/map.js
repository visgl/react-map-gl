import * as React from 'react';
import Map from 'react-map-gl';

import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function MapView() {
  const mapStyle = useSelector(s => s.mapStyle);
  const viewState = useSelector(s => s.viewState);
  const dispatch = useDispatch();

  const onMove = useCallback(evt => {
    dispatch({type: 'setViewState', payload: evt.viewState});
  }, []);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      style={{width: 800, height: 600}}
      mapStyle={mapStyle}
      mapboxAccessToken={MAPBOX_TOKEN}
    />
  );
}
