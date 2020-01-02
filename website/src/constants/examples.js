// Standalone
import Filter from 'website-examples/filter/src/app';
import Controls from 'website-examples/controls/src/app';
import CustomCursor from 'website-examples/custom-cursor/src/app';
import DraggableMarker from 'website-examples/draggable-markers/src/app';
import GeoJson from 'website-examples/geojson/src/app';
import GeoJsonAnimation from 'website-examples/geojson-animation/src/app';
import Clusters from 'website-examples/clusters/src/app';
import LocateUser from 'website-examples/locate-user/src/app';
import Interaction from 'website-examples/interaction/src/app';
import Layers from 'website-examples/layers/src/app';
import ViewportAnimation from 'website-examples/viewport-animation/src/app';
import ZoomToBounds from 'website-examples/zoom-to-bounds/src/app';
import Heatmap from 'website-examples/heatmap/src/app';
import DrawPolygon from 'website-examples/draw-polygon/src/app';

// TOC
export default [
  {
    path: 'layersExample',
    name: 'Dynamic Styling',
    component: Layers
  },
  {
    path: 'controlsExample',
    name: 'Markers & Popups',
    component: Controls
  },
  {
    path: 'customCursor',
    name: 'Custom Cursor',
    component: CustomCursor
  },
  {
    path: 'draggableMarkerExample',
    name: 'Draggable Marker',
    component: DraggableMarker
  },
  {
    path: 'geojsonExample',
    name: 'GeoJSON',
    component: GeoJson
  },
  {
    path: 'geojsonAnimationExample',
    name: 'GeoJSON Animation',
    component: GeoJsonAnimation
  },
  {
    path: 'clustersExample',
    name: 'Clusters',
    component: Clusters
  },
  {
    path: 'locateUserExample',
    name: 'Locate User',
    component: LocateUser
  },
  {
    path: 'interactionExample',
    name: 'Limit Map Interaction',
    component: Interaction
  },
  {
    path: 'viewportAnimationExample',
    name: 'Camera Transition',
    component: ViewportAnimation
  },
  {
    path: 'filter',
    name: 'Highlight By Filter',
    component: Filter
  },
  {
    path: 'zoom-to-bounds',
    name: 'Zoom To Bounds',
    component: ZoomToBounds
  },
  {
    path: 'heatmap',
    name: 'Heatmap',
    component: Heatmap
  },
  {
    path: 'drawPolygon',
    name: 'DrawPolygon',
    component: DrawPolygon
  }
];
