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
  for (const exit of sourcesDiff.exit) {
    map.removeSource(exit.id);
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
      if (
        (newSource.maxzoom === undefined ||
          newSource.maxzoom === oldOpts.geojsonVtOptions.maxZoom) &&
        (newSource.buffer === undefined ||
          newSource.buffer === oldOpts.geojsonVtOptions.buffer) &&
        (newSource.tolerance === undefined ||
          newSource.tolerance === oldOpts.geojsonVtOptions.tolerance) &&
        (newSource.cluster === undefined ||
          newSource.cluster === oldOpts.cluster) &&
        (newSource.clusterRadius === undefined ||
          newSource.clusterRadius === oldOpts.superclusterOptions.radius) &&
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
