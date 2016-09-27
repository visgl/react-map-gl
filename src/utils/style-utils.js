import {Map} from 'immutable';

export function getInteractiveLayerIds(mapStyle) {
  let interactiveLayerIds = [];

  if (Map.isMap(mapStyle) && mapStyle.has('layers')) {
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
