export const DEFAULT_FEATURE_STYLES = {
  '*': {
    fillOpacity: 0.1,
    strokeWidth: 2,
    radius: 6
  },
  selected: {
    fillOpacity: 0.3,
    radius: 10
  },
  hovered: {
    strokeWidth: 4,
    fillOpacity: 0.6
  },
  Point: {
    fill: '#f40',
    stroke: '#f00'
  },
  'LineString hovered': {
    radius: 8
  },
  LineString: {
    fill: 'none',
    stroke: '#00f'
  },
  Polygon: {
    fill: '#8f0',
    stroke: '#0f0'
  },
  'Polygon selected': {
    strokeDasharray: '4,2'
  }
};

export function getStyle(stylesheet, feature, {selected, hovered}) {
  if (!feature) {
    return null;
  }

  const type = feature.renderType;

  if (typeof stylesheet === 'function') {
    return stylesheet(feature.toFeature(), {hovered, selected});
  }

  const featureStyle = {
    ...stylesheet['*'],
    ...stylesheet[type]
  };

  if (selected) {
    return {
      ...featureStyle,
      ...stylesheet.selected,
      ...stylesheet[`${type} selected`]
    };
  }

  if (hovered) {
    return {
      ...featureStyle,
      ...stylesheet.hovered,
      ...stylesheet[`${type} hovered`]
    };
  }

  return featureStyle;
}
