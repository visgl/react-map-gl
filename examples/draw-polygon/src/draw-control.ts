import MapboxDraw from '@mapbox/mapbox-gl-draw';
import {useControl} from 'react-map-gl';

import type {MapboxMap, ControlPosition} from 'react-map-gl';

type ControlTypes =
  | 'point'
  | 'line_string'
  | 'polygon'
  | 'trash'
  | 'combine_features'
  | 'uncombine_features';

type DrawControlProps = {
  keybindings?: boolean;
  touchEnable?: boolean;
  boxSelect?: boolean;
  clickBuffer?: number;
  touchBuffer?: number;
  controls?: Partial<{[name in ControlTypes]: boolean}>;
  displayControlsDefault?: boolean;
  styles?: any;
  modes?: any;
  defaultMode?: string;
  userProperties?: boolean;

  position?: ControlPosition;

  onCreate?: (evt: {features: object[]}) => void;
  onUpdate?: (evt: {features: object[]; action: string}) => void;
  onDelete?: (evt: {features: object[]}) => void;
};

export default function DrawControl(props: DrawControlProps) {
  useControl(() => new MapboxDraw(props), {
    position: props.position,
    onAdd: (map: MapboxMap) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
    },
    onRemove: (map: MapboxMap) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
    }
  });

  return null;
}

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {}
};
