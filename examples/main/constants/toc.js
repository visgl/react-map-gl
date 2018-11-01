// Modules
import MarkerExample from '../views/marker';
import NotInteractiveExample from '../views/not-interactive';
import CustomOverlayExample from '../views/custom-overlay';
import RouteOverlayExample from '../views/route-overlay';
import StyleDiffingExample from '../views/style-diffing';
import ClickExample from '../views/click';
// Standalone
import Filter from '../../filter/src/app';
import Controls from '../../controls/src/app';
import DraggableMarker from '../../draggable-markers/src/app';
import GeoJson from '../../geojson/src/app';
import GeoJsonAnimation from '../../geojson-animation/src/app';
import Interaction from '../../interaction/src/app';
import Layers from '../../layers/src/app';
import ViewportAnimation from '../../viewport-animation/src/app';
import ZoomToBounds from '../../zoom-to-bounds/src/app';

export const BASIC_EXAMPLES = 'basicExamples';
export const STANDALONE_EXAMPLES = 'standalonExamples';

export const DEFAULT_EXAMPLE = 'markerExample';

// TOC
export const standaloneExamples = [
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
  }
];

export default [
  {
    path: BASIC_EXAMPLES,
    name: 'Basic Examples',
    children: [
      {
        path: 'markerExample',
        name: 'Marker Example',
        component: MarkerExample
      },
      {
        path: 'notInteractive',
        name: 'Not Interactive',
        component: NotInteractiveExample
      },
      {
        path: 'customOverlay',
        name: 'Custom Overlay',
        component: CustomOverlayExample
      },
      {
        path: 'routeOverlay',
        name: 'Route Overlay',
        component: RouteOverlayExample
      },
      {
        path: 'styleDiffing',
        name: 'Style Diffing',
        component: StyleDiffingExample
      },
      {
        path: 'clickExample',
        name: 'Click',
        component: ClickExample
      }
    ]
  },
  {
    path: STANDALONE_EXAMPLES,
    name: 'Standalone Examples',
    children: standaloneExamples
  }
];
