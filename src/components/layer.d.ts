
type LayerProps = {
  id?: string,
  type: 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade',
  source?: string,
  'source-layer'?: string,
  beforeId?: string,
  layout?: any,
  paint?: any,
  filter?: Array<any>,
  minzoom?: number,
  maxzoom?: number
};

export default function Layer(props: LayerProps): null;
