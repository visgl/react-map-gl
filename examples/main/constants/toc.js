// Modules
// import MarkerExample from '../views/marker';
// import NotInteractiveExample from '../views/not-interactive';
// import CustomOverlayExample from '../views/custom-overlay';
// import RouteOverlayExample from '../views/route-overlay';
// import StyleDiffingExample from '../views/style-diffing';
// import ClickExample from '../views/click';
// Standalone
import Controls from '../../controls/src/app';
import GeoJson from '../../geojson/src/app';
import GeoJsonAnimation from '../../geojson-animation/src/app';
import Interaction from '../../interaction/src/app';
import Layers from '../../layers/src/app';
import ViewportAnimation from '../../viewport-animation/src/app';

export const BASIC_EXAMPLES = 'basicExamples';
export const STANDALONE_EXAMPLES = 'standalonExamples';

export const DEFAULT_EXAMPLE = 'markerExample';

// TOC
export default [
  {
    name: 'Dynamic Styling',
    component: Layers
  },
  {
    name: 'Markers & Popups',
    component: Controls
  },
  {
    name: 'GeoJSON',
    component: GeoJson
  },
  {
    name: 'GeoJSON Animation',
    component: GeoJsonAnimation
  },
  {
    name: 'Limit Map Interaction',
    component: Interaction
  },
  {
    name: 'Camera Transition',
    component: ViewportAnimation
  }
];
