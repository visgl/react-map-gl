import * as React from 'react';
import type {
  Map as MapboxMap,
  MapboxOptions,
  Marker as MapboxMarker,
  MarkerOptions,
  Popup as MapboxPopup,
  PopupOptions,
  AttributionControl as MapboxAttributionControl,
  FullscreenControl as MapboxFullscreenControl,
  GeolocateControl as MapboxGeolocateControl,
  NavigationControl as MapboxNavigationControl,
  ScaleControl as MapboxScaleControl
} from 'mapbox-gl';
import {MapStyle, AnyLayer, AnySource} from './types/style-spec-mapbox';

import {default as _Map, MapProps as _MapProps} from './components/map';
import {default as _Marker, MarkerProps as _MarkerProps} from './components/marker';
import {default as _Popup, PopupProps as _PopupProps} from './components/popup';
import {
  default as _AttributionControl,
  AttributionControlProps as _AttributionControlProps
} from './components/attribution-control';
import {
  default as _FullscreenControl,
  FullscreenControlProps as _FullscreenControlProps
} from './components/fullscreen-control';
import {
  default as _GeolocateControl,
  GeolocateControlProps as _GeolocateControlProps
} from './components/geolocate-control';
import {
  default as _NavigationControl,
  NavigationControlProps as _NavigationControlProps
} from './components/navigation-control';
import {
  default as _ScaleControl,
  ScaleControlProps as _ScaleControlProps
} from './components/scale-control';
import {default as _Layer, LayerProps as _LayerProps} from './components/layer';
import {default as _Source, SourceProps as _SourceProps} from './components/source';
import {useMap as _useMap} from './components/use-map';
import type {MapRef as _MapRef} from './mapbox/create-ref';
import type * as events from './types/events';
import type {MapCallbacks} from './types/events-mapbox';

export function useMap() {
  return _useMap<MapboxMap>();
}

export type MapProps = _MapProps<MapboxOptions, MapStyle, MapCallbacks, MapboxMap>;
export type MapRef = _MapRef<MapboxMap>;
const mapLib = import('mapbox-gl');
export const Map = (() => {
  return React.forwardRef(function Map(props: MapProps, ref: React.Ref<MapRef>) {
    return _Map<MapboxOptions, MapStyle, MapCallbacks, MapboxMap>(props, ref, mapLib);
  });
})();

export type MarkerProps = _MarkerProps<MarkerOptions, MapboxMarker>;
export const Marker = _Marker as (
  props: MarkerProps & React.RefAttributes<MapboxMarker>
) => React.ReactElement | null;

export type PopupProps = _PopupProps<PopupOptions, MapboxPopup>;
export const Popup = _Popup as (
  props: PopupProps & React.RefAttributes<MapboxPopup>
) => React.ReactElement | null;

type AttributionControlOptions = ConstructorParameters<typeof MapboxAttributionControl>[0];
export type AttributionControlProps = _AttributionControlProps<AttributionControlOptions>;
export const AttributionControl = _AttributionControl as (
  props: AttributionControlProps
) => React.ReactElement | null;

type FullscreenControlOptions = ConstructorParameters<typeof MapboxFullscreenControl>[0];
export type FullscreenControlProps = _FullscreenControlProps<FullscreenControlOptions>;
export const FullscreenControl = _FullscreenControl as (
  props: FullscreenControlProps
) => React.ReactElement | null;

type NavigationControlOptions = ConstructorParameters<typeof MapboxNavigationControl>[0];
export type NavigationControlProps = _NavigationControlProps<NavigationControlOptions>;
export const NavigationControl = _NavigationControl as (
  props: NavigationControlProps
) => React.ReactElement | null;

type GeolocateControlOptions = ConstructorParameters<typeof MapboxGeolocateControl>[0];
export type GeolocateControlProps = _GeolocateControlProps<
  GeolocateControlOptions,
  MapboxGeolocateControl
>;
export const GeolocateControl = _GeolocateControl as (
  props: GeolocateControlProps & React.RefAttributes<MapboxGeolocateControl>
) => React.ReactElement | null;

type ScaleControlOptions = ConstructorParameters<typeof MapboxScaleControl>[0];
export type ScaleControlProps = _ScaleControlProps<ScaleControlOptions>;
export const ScaleControl = _ScaleControl as (
  props: ScaleControlProps
) => React.ReactElement | null;

export type LayerProps = _LayerProps<AnyLayer>;
export const Layer = _Layer as (props: LayerProps) => React.ReactElement | null;

export type SourceProps = _SourceProps<AnySource>;
export const Source = _Source as (props: SourceProps) => React.ReactElement | null;

export {default as useControl} from './components/use-control';
export {MapProvider} from './components/use-map';

export default Map;

// Types
export * from './types/public';
export type {
  Point,
  PointLike,
  LngLat,
  LngLatLike,
  LngLatBounds,
  LngLatBoundsLike,
  PaddingOptions,
  MapboxGeoJSONFeature as MapGeoJSONFeature,
  GeoJSONSource,
  VideoSource,
  ImageSource,
  CanvasSource,
  VectorSourceImpl as VectorTileSource
} from 'mapbox-gl';
export * from './types/style-spec-mapbox';

// Events
export type {
  MapEvent,
  MapMouseEvent,
  MapLayerMouseEvent,
  MapTouchEvent,
  MapLayerTouchEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapWheelEvent,
  MapBoxZoomEvent,
  ErrorEvent,
  ViewStateChangeEvent
} from './types/events-mapbox';
export type PopupEvent = events.PopupEvent<MapboxPopup>;
export type MarkerEvent = events.MarkerEvent<MapboxMarker>;
export type MarkerDragEvent = events.MarkerDragEvent<MapboxMarker>;
export type GeolocateEvent = events.GeolocateEvent<MapboxGeolocateControl>;
export type GeolocateResultEvent = events.GeolocateResultEvent<MapboxGeolocateControl>;
export type GeolocateErrorEvent = events.GeolocateErrorEvent<MapboxGeolocateControl>;

// v7.0 backward compatibility

/** @deprecated use `MapStyle` */
export type MapboxStyle = MapStyle;

export type {Map as MapboxMap, MapboxEvent, MapboxGeoJSONFeature} from 'mapbox-gl';
