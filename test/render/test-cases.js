/* global __MAPBOX_TOKEN__ */
import * as React from 'react';
import {StaticMap, NavigationControl, GeolocateControl, Popup, Source, Layer} from 'react-map-gl';

const EMPTY_MAP_STYLE = {
  version: 8,
  sources: {},
  layers: []
};

const ALT_EMPTY_MAP_STYLE = {
  version: 8,
  sources: {},
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#F6F046',
        'background-opacity': 1
      }
    }
  ]
};

export default [
  {
    title: 'Basic map',
    props: {
      mapboxApiAccessToken: __MAPBOX_TOKEN__,
      mapStyle: 'mapbox://styles/mapbox/dark-v9',
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5
    },
    threshold: 0.97,
    goldenImage: 'test/render/golden-images/basic-map.png'
  },
  {
    title: 'Invalid map token',
    props: {
      mapboxApiAccessToken: 'invalid_token',
      mapStyle: 'mapbox://styles/mapbox/dark-v9',
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5
    },
    mapError: /access token/
  },
  {
    title: 'Custom tile server',
    props: {
      mapboxApiAccessToken: __MAPBOX_TOKEN__,
      mapStyle: 'http://localhost:5000/test/data/style.json',
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5
    },
    threshold: 0.97,
    goldenImage: 'test/render/golden-images/uber-map.png'
  },
  {
    title: 'NavigationControl',
    Component: StaticMap,
    props: {
      mapboxApiAccessToken: __MAPBOX_TOKEN__,
      mapStyle: EMPTY_MAP_STYLE,
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5,
      bearing: 30,
      children: (
        <div style={{position: 'absolute', left: 10, top: 10}}>
          <NavigationControl />
        </div>
      )
    },
    goldenImage: 'test/render/golden-images/navigation-control.png'
  },
  {
    title: 'Popup',
    Component: StaticMap,
    props: {
      mapboxApiAccessToken: __MAPBOX_TOKEN__,
      mapStyle: EMPTY_MAP_STYLE,
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5,
      children: [
        <Popup key="0" longitude={-122.4} latitude={37.78} className="test-popup">
          This is the center
        </Popup>,
        <Popup
          key="1"
          longitude={-122.4}
          latitude={37.779}
          closeButton={false}
          anchor="top-right"
          className="test-popup"
        >
          Custom anchor
        </Popup>
      ]
    },
    threshold: 0.95,
    goldenImage: 'test/render/golden-images/popup.png'
  },
  {
    title: 'JSX Source/Layer',
    Component: StaticMap,
    props: {
      mapboxApiAccessToken: __MAPBOX_TOKEN__,
      mapStyle: EMPTY_MAP_STYLE,
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5,
      children: [
        <Source
          key="geojson-data"
          type="geojson"
          data={{type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.78]}}}
        >
          <Layer type="circle" paint={{'circle-radius': 10, 'circle-color': '#08f'}} />
        </Source>
      ]
    },
    goldenImage: 'test/render/golden-images/source-01.png'
  },
  {
    title: 'JSX Source/Layer toggle style',
    Component: StaticMap,
    props: {
      mapboxApiAccessToken: __MAPBOX_TOKEN__,
      mapStyle: ALT_EMPTY_MAP_STYLE,
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5,
      children: [
        <Source
          key="geojson-data"
          type="geojson"
          data={{type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.78]}}}
        >
          <Layer type="circle" paint={{'circle-radius': 10, 'circle-color': '#08f'}} />
        </Source>
      ]
    },
    goldenImage: 'test/render/golden-images/source-02.png'
  },
  {
    title: 'JSX Source/Layer removal',
    Component: StaticMap,
    props: {
      mapboxApiAccessToken: __MAPBOX_TOKEN__,
      mapStyle: ALT_EMPTY_MAP_STYLE,
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5,
      children: []
    },
    goldenImage: 'test/render/golden-images/alt-empty-map.png'
  },
  {
    title: 'GeolocateControl',
    Component: StaticMap,
    props: {
      mapboxApiAccessToken: __MAPBOX_TOKEN__,
      mapStyle: EMPTY_MAP_STYLE,
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5,
      bearing: 30,
      children: (
        <GeolocateControl
          style={{position: 'absolute', left: 10, top: 10}}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      )
    },
    goldenImage: 'test/render/golden-images/geolocate-control.png'
  }
].filter(testCase => testCase.props.mapboxApiAccessToken);
