import type {
  Map as MapInstance,
  MapboxOptions as MapOptions,
  Marker as MarkerInstance,
  MarkerOptions,
  Popup as PopupInstance,
  PopupOptions,
  AttributionControl as AttributionControlInstance,
  FullscreenControl as FullscreenControlInstance,
  FullscreenControlOptions,
  GeolocateControl as GeolocateControlInstance,
  NavigationControl as NavigationControlInstance,
  ScaleControl as ScaleControlInstance
} from 'mapbox-gl';

type AttributionControlOptions = ConstructorParameters<typeof AttributionControlInstance>[0];
type GeolocateControlOptions = ConstructorParameters<typeof GeolocateControlInstance>[0];
type NavigationControlOptions = ConstructorParameters<typeof NavigationControlInstance>[0];
type ScaleControlOptions = ConstructorParameters<typeof ScaleControlInstance>[0];

export type {IControl, CustomLayerInterface} from 'mapbox-gl';

export type {
  MapInstance,
  MapOptions,
  MarkerInstance,
  MarkerOptions,
  PopupInstance,
  PopupOptions,
  AttributionControlInstance,
  AttributionControlOptions,
  FullscreenControlInstance,
  FullscreenControlOptions,
  GeolocateControlInstance,
  GeolocateControlOptions,
  NavigationControlInstance,
  NavigationControlOptions,
  ScaleControlInstance,
  ScaleControlOptions
};

export type ControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * A user-facing type that represents the minimal intersection between Mapbox and Maplibre
 * User provided `mapLib` is supposed to implement this interface
 * Only loosely typed for compatibility
 */
export interface MapLib {
  supported?: (options: any) => boolean;

  Map: {new (options: MapOptions): MapInstance};

  Marker: {new (options: MarkerOptions): MarkerInstance};

  Popup: {new (options: PopupOptions): PopupInstance};

  AttributionControl: {new (options: AttributionControlOptions): AttributionControlInstance};

  FullscreenControl: {new (options: FullscreenControlOptions): FullscreenControlInstance};

  GeolocateControl: {new (options: GeolocateControlOptions): GeolocateControlInstance};

  NavigationControl: {new (options: NavigationControlOptions): NavigationControlInstance};

  ScaleControl: {new (options: ScaleControlOptions): ScaleControlInstance};
}
