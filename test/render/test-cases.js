/* global __MAPBOX_TOKEN__ */
import * as React from 'react';
import {NavigationControl, GeolocateControl, Marker, Popup, Source, Layer} from 'react-map-gl';

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
      mapboxAccessToken: __MAPBOX_TOKEN__,
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
      mapboxAccessToken: 'invalid_token',
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
      mapboxAccessToken: __MAPBOX_TOKEN__,
      mapStyle: '/test/data/style.json',
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5
    },
    threshold: 0.97,
    goldenImage: 'test/render/golden-images/uber-map.png'
  },
  {
    title: 'NavigationControl',
    props: {
      mapboxAccessToken: __MAPBOX_TOKEN__,
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5,
      bearing: 30,
      children: <NavigationControl position="top-left" />
    },
    goldenImage: 'test/render/golden-images/navigation-control.png'
  },
  {
    title: 'GeolocateControl',
    props: {
      mapboxAccessToken: __MAPBOX_TOKEN__,
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5,
      bearing: 30,
      children: (
        <GeolocateControl
          position="top-left"
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      )
    },
    goldenImage: 'test/render/golden-images/geolocate-control.png'
  },
  {
    title: 'Marker',
    props: {
      mapboxAccessToken: __MAPBOX_TOKEN__,
      longitude: -122.4,
      latitude: 37.78,
      reuseMaps: true,
      zoom: 12.5,
      children: [
        <Marker key="0" longitude={-122.4} latitude={37.78} />,
        <Marker key="1" longitude={-122.41} latitude={37.779} anchor="bottom">
          <svg height={24} viewBox="0 0 24 24" style={{fill: '#d00', stroke: 'none'}}>
            <path
              d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
            />
          </svg>
        </Marker>
      ]
    },
    threshold: 0.95,
    goldenImage: 'test/render/golden-images/marker.png'
  },
  {
    title: 'Popup',
    props: {
      mapboxAccessToken: __MAPBOX_TOKEN__,
      longitude: -122.4,
      latitude: 37.78,
      reuseMaps: true,
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
    props: {
      mapboxAccessToken: __MAPBOX_TOKEN__,
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
    props: {
      mapboxAccessToken: __MAPBOX_TOKEN__,
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
    props: {
      mapboxAccessToken: __MAPBOX_TOKEN__,
      mapStyle: ALT_EMPTY_MAP_STYLE,
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5,
      children: []
    },
    goldenImage: 'test/render/golden-images/alt-empty-map.png'
  }
].filter(testCase => testCase.props.mapboxAccessToken);
