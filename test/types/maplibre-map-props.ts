import type {ComponentProps} from 'react';
import Map from 'react-map-gl/maplibre';
import type {MapOptions} from 'maplibre-gl';

type MapProps = ComponentProps<typeof Map>;

type MutableMapOptionKeys =
  | 'minZoom'
  | 'maxZoom'
  | 'minPitch'
  | 'maxPitch'
  | 'maxBounds'
  | 'renderWorldCopies';

declare const mapOptions: Pick<MapOptions, MutableMapOptionKeys>;
const mapProps: Pick<MapProps, MutableMapOptionKeys> = mapOptions;
const nullableCameraConstraints: Pick<MapProps, 'minZoom' | 'maxZoom' | 'minPitch' | 'maxPitch'> = {
  minZoom: null,
  maxZoom: null,
  minPitch: null,
  maxPitch: null
};

void mapProps;
void nullableCameraConstraints;
