import MapboxDraw from '@mapbox/mapbox-gl-draw';
import {useControl} from 'react-map-gl';

import type {MapRef, ControlPosition} from 'react-map-gl';
import GeoJSON from "geojson";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: {features: GeoJSON.Feature[]}) => void;
  onUpdate?: (evt: {features: GeoJSON.Feature[]; action: string}) => void;
  onDelete?: (evt: {features: GeoJSON.Feature[]}) => void;
};

export default function DrawControl(props: DrawControlProps) {
  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({map}: {map: MapRef}) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
    },
    ({map}: {map: MapRef}) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
    },
    {
      position: props.position
    }
  );

  return null;
}

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {}
};
