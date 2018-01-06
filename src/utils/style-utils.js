export function getInteractiveLayerIds(mapStyle) {
  let interactiveLayerIds = null;

  if (typeof mapStyle.toJS === 'function' && mapStyle.has('layers')) {
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

// Style diffing doesn't work with refs so expand them out manually before diffing.
export function expandRefs(style) {
  if (!style) {
    return null;
  }
  if (typeof style === 'string') {
    return style;
  }
  if (style.toJS) {
    style = style.toJS();
  }
  const layerIndex = style.layers.reduce(
    (accum, current) => Object.assign(accum, {[current.id]: current}),
    {}
  );
  style.layers = style.layers.map(layer => {
    layer = Object.assign({}, layer);
    const layerRef = layerIndex[layer.ref];
    if (layerRef) {
      delete layer.ref;
      if (layerRef.type !== undefined) {
        layer.type = layerRef.type;
      }
      if (layerRef.source !== undefined) {
        layer.source = layerRef.source;
      }
      if (layerRef['source-layer'] !== undefined) {
        layer['source-layer'] = layerRef['source-layer'];
      }
      if (layerRef.minzoom !== undefined) {
        layer.minzoom = layerRef.minzoom;
      }
      if (layerRef.maxzoom !== undefined) {
        layer.maxzoom = layerRef.maxzoom;
      }
      if (layerRef.filter !== undefined) {
        layer.filter = layerRef.filter;
      }
      if (layerRef.layout !== undefined) {
        layer.layout = layer.layout || {};
        layer.layout = Object.assign({}, layer.layout, layerRef.layout);
      }
    }
    return layer;
  });
  return style;
}
