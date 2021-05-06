import * as MapboxGL from "mapbox-gl";
import {ReactElement, Ref} from "react";

export interface LayerProps {
  id?: string;
  type:  'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade' | 'sky';
  source?: string;
  'source-layer'?: string,
  beforeId?: string;
  layout?: MapboxGL.AnyLayout;
  paint:
    | MapboxGL.BackgroundPaint
    | MapboxGL.FillPaint
    | MapboxGL.FillExtrusionPaint
    | MapboxGL.LinePaint
    | MapboxGL.SymbolPaint
    | MapboxGL.RasterPaint
    | MapboxGL.CirclePaint
    | MapboxGL.HeatmapPaint
    | MapboxGL.HillshadePaint;
  filter?: any[];
  minzoom?: number;
  maxzoom?: number;
  ref?:Ref<LayerProps>
}

export default function Layer(props: LayerProps): ReactElement;


