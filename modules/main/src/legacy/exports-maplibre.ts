import * as React from 'react';
import type {
  Map as MaplibreMap,
  MapOptions,
  Marker as MaplibreMarker,
  MarkerOptions,
  Popup as MaplibrePopup,
  PopupOptions,
  AttributionControl as MaplibreAttributionControl,
  FullscreenControl as MaplibreFullscreenControl,
  GeolocateControl as MaplibreGeolocateControl,
  NavigationControl as MaplibreNavigationControl,
  ScaleControl as MaplibreScaleControl
} from 'maplibre-gl';
import {MapStyle, AnyLayer, AnySource} from './types/style-spec-maplibre';

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
import type {MapCallbacks} from './types/events-maplibre';

export function useMap() {
  return _useMap<MaplibreMap>();
}

export type MapProps = _MapProps<MapOptions, MapStyle, MapCallbacks, MaplibreMap>;
export type MapRef = _MapRef<MaplibreMap>;
const mapLib = import('maplibre-gl');
export const Map = (() => {
  return React.forwardRef(function Map(props: MapProps, ref: React.Ref<MapRef>) {
    return _Map<MapOptions, MapStyle, MapCallbacks, MaplibreMap>(props, ref, mapLib);
  });
})();

export type MarkerProps = _MarkerProps<MarkerOptions, MaplibreMarker>;
export const Marker = _Marker as (
  props: MarkerProps & React.RefAttributes<MaplibreMarker>
) => React.ReactElement | null;

export type PopupProps = _PopupProps<PopupOptions, MaplibrePopup>;
export const Popup = _Popup as (
  props: PopupProps & React.RefAttributes<MaplibrePopup>
) => React.ReactElement | null;

type AttributionControlOptions = ConstructorParameters<typeof MaplibreAttributionControl>[0];
export type AttributionControlProps = _AttributionControlProps<AttributionControlOptions>;
export const AttributionControl = _AttributionControl as (
  props: AttributionControlProps
) => React.ReactElement | null;

type FullscreenControlOptions = ConstructorParameters<typeof MaplibreFullscreenControl>[0];
export type FullscreenControlProps = _FullscreenControlProps<FullscreenControlOptions>;
export const FullscreenControl = _FullscreenControl as (
  props: FullscreenControlProps
) => React.ReactElement | null;

type NavigationControlOptions = ConstructorParameters<typeof MaplibreNavigationControl>[0];
export type NavigationControlProps = _NavigationControlProps<NavigationControlOptions>;
export const NavigationControl = _NavigationControl as (
  props: NavigationControlProps
) => React.ReactElement | null;

type GeolocateControlOptions = ConstructorParameters<typeof MaplibreGeolocateControl>[0];
export type GeolocateControlProps = _GeolocateControlProps<
  GeolocateControlOptions,
  MaplibreGeolocateControl
>;
export const GeolocateControl = _GeolocateControl as (
  props: GeolocateControlProps & React.RefAttributes<MaplibreGeolocateControl>
) => React.ReactElement | null;

type ScaleControlOptions = ConstructorParameters<typeof MaplibreScaleControl>[0];
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
export type {default as Point} from '@mapbox/point-geometry';
export type {
  PointLike,
  LngLat,
  LngLatLike,
  LngLatBounds,
  LngLatBoundsLike,
  PaddingOptions,
  MapGeoJSONFeature,
  GeoJSONSource,
  VideoSource,
  ImageSource,
  CanvasSource,
  VectorTileSource
} from 'maplibre-gl';
export * from './types/style-spec-maplibre';

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
} from './types/events-maplibre';
export type PopupEvent = events.PopupEvent<MaplibrePopup>;
export type MarkerEvent = events.MarkerEvent<MaplibreMarker>;
export type MarkerDragEvent = events.MarkerDragEvent<MaplibreMarker>;
export type GeolocateEvent = events.GeolocateEvent<MaplibreGeolocateControl>;
export type GeolocateResultEvent = events.GeolocateResultEvent<MaplibreGeolocateControl>;
export type GeolocateErrorEvent = events.GeolocateErrorEvent<MaplibreGeolocateControl>;
