import * as React from 'react';
import {useContext, useEffect, useMemo, useState, useRef} from 'react';
import {cloneElement} from 'react';
import {MapContext} from './map';
import assert from '../utils/assert';
import {deepEqual} from '../utils/deep-equal';

import type {
  MapInstance,
  ISource,
  CustomSource,
  GeoJSONSourceImplementation,
  ImageSourceImplemtation,
  AnySourceImplementation
} from '../types';
import type {GeoJSONSourceRaw, ImageSourceRaw, VectorSourceRaw} from '../types/style-spec-maplibre';

export type SourceProps<SourceT> = (SourceT | CustomSource) & {
  id?: string;
  children?: any;
};

let sourceCounter = 0;

function createSource<SourceT extends ISource>(
  map: MapInstance,
  id: string,
  props: SourceProps<SourceT>
) {
  // @ts-ignore
  if (map.style && map.style._loaded) {
    const options = {...props};
    delete options.id;
    delete options.children;
    // @ts-ignore
    map.addSource(id, options);
    return map.getSource(id);
  }
  return null;
}

/* eslint-disable complexity */
function updateSource<SourceT extends ISource>(
  source: AnySourceImplementation,
  props: SourceProps<SourceT>,
  prevProps: SourceProps<SourceT>
) {
  assert(props.id === prevProps.id, 'source id changed');
  assert(props.type === prevProps.type, 'source type changed');

  let changedKey = '';
  let changedKeyCount = 0;

  for (const key in props) {
    if (key !== 'children' && key !== 'id' && !deepEqual(prevProps[key], props[key])) {
      changedKey = key;
      changedKeyCount++;
    }
  }

  if (!changedKeyCount) {
    return;
  }

  const type = props.type;

  if (type === 'geojson') {
    (source as GeoJSONSourceImplementation).setData(
      (props as unknown as GeoJSONSourceRaw).data as any
    );
  } else if (type === 'image') {
    (source as ImageSourceImplemtation).updateImage({
      url: (props as unknown as ImageSourceRaw).url,
      coordinates: (props as unknown as ImageSourceRaw).coordinates
    });
  } else if ('setCoordinates' in source && changedKeyCount === 1 && changedKey === 'coordinates') {
    source.setCoordinates((props as ImageSourceRaw).coordinates);
  } else if ('setUrl' in source && changedKey === 'url') {
    source.setUrl((props as VectorSourceRaw).url);
  } else if ('setTiles' in source && changedKey === 'tiles') {
    source.setTiles((props as VectorSourceRaw).tiles);
  } else {
    // eslint-disable-next-line
    console.warn(`Unable to update <Source> prop: ${changedKey}`);
  }
}
/* eslint-enable complexity */

function Source<SourceT extends ISource>(props: SourceProps<SourceT>) {
  const map = useContext(MapContext).map.getMap();
  const propsRef = useRef(props);
  const [, setStyleLoaded] = useState(0);

  const id = useMemo(() => props.id || `jsx-source-${sourceCounter++}`, []);

  useEffect(() => {
    if (map) {
      /* global setTimeout */
      const forceUpdate = () => setTimeout(() => setStyleLoaded(version => version + 1), 0);
      map.on('styledata', forceUpdate);
      forceUpdate();

      return () => {
        map.off('styledata', forceUpdate);
        // @ts-ignore
        if (map.style && map.style._loaded && map.getSource(id)) {
          // Parent effects are destroyed before child ones, see
          // https://github.com/facebook/react/issues/16728
          // Source can only be removed after all child layers are removed
          const allLayers = map.getStyle()?.layers;
          if (allLayers) {
            for (const layer of allLayers) {
              // @ts-ignore (2339) source does not exist on all layer types
              if (layer.source === id) {
                map.removeLayer(layer.id);
              }
            }
          }
          map.removeSource(id);
        }
      };
    }
    return undefined;
  }, [map]);

  // @ts-ignore
  let source = map && map.style && map.getSource(id);
  if (source) {
    updateSource(source, props, propsRef.current);
  } else {
    source = createSource(map, id, props);
  }
  propsRef.current = props;

  return (
    (source &&
      React.Children.map(
        props.children,
        child =>
          child &&
          cloneElement(child, {
            source: id
          })
      )) ||
    null
  );
}

export default Source;
