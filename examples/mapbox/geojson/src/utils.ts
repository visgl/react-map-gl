import {range} from 'd3-array';
import {scaleQuantile} from 'd3-scale';

import type GeoJSON from 'geojson';

export function updatePercentiles(
  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Geometry>,
  accessor: (f: GeoJSON.Feature<GeoJSON.Geometry>) => number
): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
  const {features} = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  return {
    type: 'FeatureCollection',
    features: features.map(f => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value)
      };
      return {...f, properties};
    })
  };
}
