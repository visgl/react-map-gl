
import {PureComponent, ReactElement} from 'react';
import * as GeoJSON from 'geojson';

export interface SourceProps {
  id?: string;
  type: string;
  url?: string;
  tiles?: string[];
  tileSize?: number;
  bounds?: number[];
  scheme?: 'xyz' | 'tms';
  minzoom?: number;
  maxzoom?: number;
  attribution?: string;
  encoding?: 'terrarium' | 'mapbox';
  data?: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string;
  buffer?: number;
  tolerance?: number;
  cluster?: boolean;
  clusterRadius?: number;
  clusterProperties?: object;
  clusterMaxZoom?: number;
  lineMetrics?: boolean;
  generateId?: boolean;
  coordinates?: number[][];
  urls?: string[];
  children?: any;
  promoteId?: string;
}

export default class Source extends PureComponent<SourceProps> {}

