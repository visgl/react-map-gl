import {range} from 'd3-array';
import {scaleQuantile} from 'd3-scale';

export function updatePercentiles(featureCollection, accessor) {
  const scale = scaleQuantile().domain(featureCollection.features.map(accessor)).range(range(9));
  const features = featureCollection.features.map(feature => {
    const value = accessor(feature);
    return Object.assign({}, feature, {
      properties: Object.assign({}, feature.properties, {
        value: accessor(feature),
        percentile: scale(value)
      })
    });
  });
  return {features, type: 'FeatureCollection'};
}
