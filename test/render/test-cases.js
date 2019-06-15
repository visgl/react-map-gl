/* global __MAPBOX_TOKEN__ */
import React from 'react';
import {StaticMap, NavigationControl, Popup} from 'react-map-gl';

const EMPTY_MAP_STYLE = {
  version: 8,
  sources: {},
  layers: []
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
    goldenImage: 'test/render/golden-images/basic-map.png'
  },
  {
    title: 'Invalid map token',
    props: {
      mapboxApiAccessToken: '',
      mapStyle: 'mapbox://styles/mapbox/dark-v9',
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5
    },
    mapError: /Unauthorized/
  },
  {
    title: 'Custom tile server',
    props: {
      mapboxApiAccessToken: '',
      mapStyle: 'https://d3dt5tsgfu6lcf.cloudfront.net/style/tools/web',
      longitude: -122.4,
      latitude: 37.78,
      zoom: 12.5
    },
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
        <Popup key="0" longitude={-122.4} latitude={37.78}>
          This is the center
        </Popup>,
        <Popup key="1" longitude={-122.4} latitude={37.779} closeButton={false} anchor="top-right">
          Custom anchor
        </Popup>
      ]
    },
    goldenImage: 'test/render/golden-images/popup.png'
  }
];
