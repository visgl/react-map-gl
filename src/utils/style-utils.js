// @flow
type MapboxStyle =
  | string
  | {
      toJS?: Function,
      layers: Array<any>
    };

const refProps = ['type', 'source', 'source-layer', 'minzoom', 'maxzoom', 'filter', 'layout'];

// Prepare a map style object for diffing
// If immutable - convert to plain object
// Work around some issues in the styles that would fail Mapbox's diffing
export function normalizeStyle(style: ?MapboxStyle): ?MapboxStyle {
  if (!style) {
    return null;
  }
  if (typeof style === 'string') {
    return style;
  }
  if (style.toJS) {
    style = style.toJS();
  }
  const layerIndex = {};

  for (const layer of style.layers) {
    layerIndex[layer.id] = layer;
  }

  const layers = style.layers.map(layer => {
    const layerRef = layerIndex[layer.ref];
    let normalizedLayer = null;

    if ('interactive' in layer) {
      normalizedLayer = {...layer};
      // Breaks style diffing :(
      delete normalizedLayer.interactive;
    }

    // Style diffing doesn't work with refs so expand them out manually before diffing.
    if (layerRef) {
      normalizedLayer = normalizedLayer || {...layer};
      delete normalizedLayer.ref;
      // https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/deref.js
      for (const propName of refProps) {
        if (propName in layerRef) {
          normalizedLayer[propName] = layerRef[propName];
        }
      }
    }

    return normalizedLayer || layer;
  });

  // Do not mutate the style object provided by the user
  return {...style, layers};
}
