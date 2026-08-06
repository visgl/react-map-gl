import {expect, test} from 'vitest';

import {normalizeStyle} from 'react-map-gl/mapbox-legacy/utils/style-utils';

const testStyle = {
  version: 8,
  name: 'Test',
  sources: {
    mapbox: {
      url: 'mapbox://mapbox.mapbox-streets-v7',
      type: 'vector'
    }
  },
  sprite: 'mapbox://sprites/mapbox/basic-v8',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#dedede'
      }
    },
    {
      id: 'park',
      type: 'fill',
      source: 'mapbox',
      'source-layer': 'landuse_overlay',
      filter: ['==', 'class', 'park'],
      paint: {
        'fill-color': '#d2edae',
        'fill-opacity': 0.75
      },
      interactive: true
    },
    {
      id: 'road',
      source: 'mapbox',
      'source-layer': 'road',
      layout: {
        'line-cap': 'butt',
        'line-join': 'miter'
      },
      filter: ['all', ['==', '$type', 'LineString']],
      type: 'line',
      paint: {
        'line-color': '#efefef',
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30]
          ]
        }
      },
      minzoom: 5,
      maxzoom: 20,
      interactive: true
    },
    {
      id: 'park-2',
      ref: 'park',
      paint: {
        'fill-color': '#00f080',
        'fill-opacity': 0.5
      }
    },
    {
      id: 'road-outline',
      ref: 'road',
      minzoom: 10,
      maxzoom: 12,
      paint: {
        'line-color': '#efefef',
        'line-width': {
          base: 2,
          stops: [
            [4, 0.5],
            [20, 40]
          ]
        }
      }
    }
  ]
};

const expectedStyle = {
  version: 8,
  name: 'Test',
  sources: {
    mapbox: {
      url: 'mapbox://mapbox.mapbox-streets-v7',
      type: 'vector'
    }
  },
  sprite: 'mapbox://sprites/mapbox/basic-v8',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#dedede'
      }
    },
    {
      id: 'park',
      type: 'fill',
      source: 'mapbox',
      'source-layer': 'landuse_overlay',
      filter: ['==', 'class', 'park'],
      paint: {
        'fill-color': '#d2edae',
        'fill-opacity': 0.75
      }
    },
    {
      id: 'road',
      source: 'mapbox',
      'source-layer': 'road',
      layout: {
        'line-cap': 'butt',
        'line-join': 'miter'
      },
      filter: ['all', ['==', '$type', 'LineString']],
      type: 'line',
      paint: {
        'line-color': '#efefef',
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30]
          ]
        }
      },
      minzoom: 5,
      maxzoom: 20
    },
    {
      id: 'park-2',
      type: 'fill',
      source: 'mapbox',
      'source-layer': 'landuse_overlay',
      filter: ['==', 'class', 'park'],
      paint: {
        'fill-color': '#00f080',
        'fill-opacity': 0.5
      }
    },
    {
      id: 'road-outline',
      source: 'mapbox',
      'source-layer': 'road',
      layout: {
        'line-cap': 'butt',
        'line-join': 'miter'
      },
      filter: ['all', ['==', '$type', 'LineString']],
      type: 'line',
      minzoom: 5,
      maxzoom: 20,
      paint: {
        'line-color': '#efefef',
        'line-width': {
          base: 2,
          stops: [
            [4, 0.5],
            [20, 40]
          ]
        }
      }
    }
  ]
};

test('normalizeStyle', () => {
  // Make sure the style is not mutated
  freezeRecursive(testStyle);

  expect(normalizeStyle(null), 'Handles null').toBe(null);
  expect(normalizeStyle('mapbox://styles/mapbox/light-v9'), 'Handles url string').toBe(
    'mapbox://styles/mapbox/light-v9'
  );

  let result = normalizeStyle(testStyle);
  expect(result, 'style is not mutated').not.toBe(testStyle);
  expect(result, 'plain object style is normalized').toEqual(expectedStyle);

  // Immutable-like object
  result = normalizeStyle({toJS: () => testStyle});
  expect(result, 'immutable style is normalized').toEqual(expectedStyle);
});

function freezeRecursive(obj) {
  if (!obj) return;
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      for (const el of obj) {
        freezeRecursive(el);
      }
    } else {
      for (const key in obj) {
        freezeRecursive(obj[key]);
      }
    }
    Object.freeze(obj);
  }
}
