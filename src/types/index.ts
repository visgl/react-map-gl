export * from './external';
export type {MapLib, MapInstance, Transform, MapInstanceInternal} from './map';

// re-export mapbox types
export type {
  AnyLayer,
  AnySourceData,
  AnySourceImpl,
  MapMouseEvent,
  Marker as MapboxMarker,
  Popup as MapboxPopup,
  AttributionControl as MapboxAttributionControl,
  FullscreenControl as MapboxFullscreenControl,
  GeolocateControl as MapboxGeolocateControl,
  NavigationControl as MapboxNavigationControl,
  ScaleControl as MapboxScaleControl,
  ElevationQueryOptions
} from 'mapbox-gl';
