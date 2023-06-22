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
import {useMap as _useMap} from './components/use-map';
import type {MapRef as _MapRef} from './mapbox/create-ref';
import type * as events from './types/events';

export function useMap() {
  return _useMap<MaplibreMap>();
}

export type MapProps = _MapProps<MapOptions, MaplibreMap>;
export type MapRef = _MapRef<MaplibreMap>;
const mapLib = import('maplibre-gl');
export const Map = (() => {
  return React.forwardRef(function Map(props: MapProps, ref: React.Ref<MapRef>) {
    return _Map(props, ref, mapLib);
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

export {default as Source} from './components/source';
export {default as Layer} from './components/layer';
export {default as useControl} from './components/use-control';
export {MapProvider} from './components/use-map';

export default Map;

// Types
export * from './types/public';
export type {SourceProps} from './components/source';
export type {LayerProps} from './components/layer';

// Events
export type MapEvent = events.MapEvent<MaplibreMap>;
export type ErrorEvent = events.ErrorEvent<MaplibreMap>;
export type MapStyleDataEvent = events.MapStyleDataEvent<MaplibreMap>;
export type MapSourceDataEvent = events.MapSourceDataEvent<MaplibreMap>;
export type MapMouseEvent = events.MapMouseEvent<MaplibreMap>;
export type MapLayerMouseEvent = events.MapLayerMouseEvent<MaplibreMap>;
export type MapTouchEvent = events.MapTouchEvent<MaplibreMap>;
export type MapLayerTouchEvent = events.MapLayerTouchEvent<MaplibreMap>;
export type MapWheelEvent = events.MapWheelEvent<MaplibreMap>;
export type MapBoxZoomEvent = events.MapBoxZoomEvent<MaplibreMap>;
export type ViewStateChangeEvent = events.ViewStateChangeEvent<MaplibreMap>;
export type PopupEvent = events.PopupEvent<MaplibrePopup>;
export type MarkerEvent = events.MarkerEvent<MaplibreMarker>;
export type MarkerDragEvent = events.MarkerDragEvent<MaplibreMarker>;
export type GeolocateEvent = events.GeolocateEvent<MaplibreGeolocateControl>;
export type GeolocateResultEvent = events.GeolocateResultEvent<MaplibreGeolocateControl>;
export type GeolocateErrorEvent = events.GeolocateErrorEvent<MaplibreGeolocateControl>;
