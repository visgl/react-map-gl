import isImmutableMap from './is-immutable-map';
import diffStyles from './diff-styles';

export function getInteractiveLayerIds(mapStyle) {
  let interactiveLayerIds = null;

  if (isImmutableMap(mapStyle) && mapStyle.has('layers')) {
    interactiveLayerIds = mapStyle.get('layers')
      .filter(l => l.get('interactive'))
      .map(l => l.get('id'))
      .toJS();
  } else if (Array.isArray(mapStyle.layers)) {
    interactiveLayerIds = mapStyle.layers.filter(l => l.interactive)
      .map(l => l.id);
  }

  return interactiveLayerIds;
}

// Individually update the maps source and layers that have changed if all
// other style props haven't changed. This prevents flicking of the map when
// styles only change sources or layers.
/* eslint-disable max-statements, complexity */
export function setDiffStyle(prevStyle, nextStyle, map) {
  const prevKeysMap = prevStyle && styleKeysMap(prevStyle) || {};
  const nextKeysMap = styleKeysMap(nextStyle);
  function styleKeysMap(style) {
    return style.map(() => true).delete('layers').delete('sources').toJS();
  }
  function propsOtherThanLayersOrSourcesDiffer() {
    const prevKeysList = Object.keys(prevKeysMap);
    const nextKeysList = Object.keys(nextKeysMap);
    if (prevKeysList.length !== nextKeysList.length) {
      return true;
    }
    // `nextStyle` and `prevStyle` should not have the same set of props.
    if (nextKeysList.some(
      key => prevStyle.get(key) !== nextStyle.get(key)
      // But the value of one of those props is different.
    )) {
      return true;
    }
    return false;
  }

  if (!prevStyle || propsOtherThanLayersOrSourcesDiffer()) {
    map.setStyle(nextStyle.toJS());
    return;
  }

  const {sourcesDiff, layersDiff} = diffStyles(prevStyle, nextStyle);
  checkForEqualLayerSourceChanges(sourcesDiff.exit, nextStyle.get('layers'));
  applySourceLayerChanges(map, nextStyle, sourcesDiff, layersDiff);
}

/* eslint-enable max-statements, complexity */

// Update a source in the map style
function updateStyleSource(map, update) {
  const newSource = update.source.toJS();
  if (newSource.type === 'geojson') {
    const oldSource = map.getSource(update.id);
    if (oldSource.type === 'geojson') {
      // update data if no other GeoJSONSource options were changed
      const oldOpts = oldSource.workerOptions;
      // GeoJSONSource class scales user options before assigning to workerOptions
      // https://github.com/mapbox/mapbox-gl-js/blob/master/src/source/geojson_source.js
      const scale = oldOpts.geojsonVtOptions.extent / 512;

      if (
        (newSource.maxzoom === undefined ||
          newSource.maxzoom === oldOpts.geojsonVtOptions.maxZoom) &&
        (newSource.buffer === undefined ||
          newSource.buffer === oldOpts.geojsonVtOptions.buffer / scale) &&
        (newSource.tolerance === undefined ||
          newSource.tolerance === oldOpts.geojsonVtOptions.tolerance / scale) &&
        (newSource.cluster === undefined ||
          newSource.cluster === oldOpts.cluster) &&
        (newSource.clusterRadius === undefined ||
          newSource.clusterRadius === oldOpts.superclusterOptions.radius / scale) &&
        (newSource.clusterMaxZoom === undefined ||
          newSource.clusterMaxZoom === oldOpts.superclusterOptions.maxZoom)
      ) {
        oldSource.setData(newSource.data);
        return;
      }
    }
  }

  map.removeSource(update.id);
  map.addSource(update.id, newSource);
}

function applySourceLayerChanges(map, nextStyle, sourcesDiff, layersDiff) {
// TODO: It's rather difficult to determine style diffing in the presence
  // of refs. For now, if any style update has a ref, fallback to no diffing.
  // We can come back to this case if there's a solid usecase.
  if (layersDiff.updates.some(node => node.layer.get('ref'))) {
    map.setStyle(nextStyle.toJS());
    return;
  }

  for (const enter of sourcesDiff.enter) {
    map.addSource(enter.id, enter.source.toJS());
  }
  for (const update of sourcesDiff.update) {
    updateStyleSource(map, update);
  }

  for (const exit of layersDiff.exiting) {
    if (map.style.getLayer(exit.id)) {
      map.removeLayer(exit.id);
    }
  }
  for (const update of layersDiff.updates) {
    if (!update.enter) {
      // This is an old layer that needs to be updated. Remove the old layer
      // with the same id and add it back again.
      map.removeLayer(update.id);
    }
    map.addLayer(update.layer.toJS(), update.before);
  }

  for (const exit of sourcesDiff.exit) {
    map.removeSource(exit.id);
  }
}

/* eslint-disable max-len */
function checkForEqualLayerSourceChanges(sourceExit, nextLayers) {
  const sourceIds = sourceExit.map(s => s.id);
  const layersNotRemoved = nextLayers.filter(lyr => sourceIds.includes(lyr.get('source')));
  if (layersNotRemoved.size) {
    // because of this, no source/layer changes will take effect if there is an error
    throw new Error(`You must remove any layers associated with sources you are removing: ${layersNotRemoved.map(l => l.get('id')).toJS().join('')}`);
  }
}
