// Modules
import MarkerExample from '../views/marker';
import NotInteractiveExample from '../views/not-interactive';
import CustomOverlayExample from '../views/custom-overlay';
import RouteOverlayExample from '../views/route-overlay';
import StyleDiffingExample from '../views/style-diffing';
import ClickExample from '../views/click';
// Standalone
import Controls from '../../controls/src/app';
import GeoJson from '../../geojson/src/app';
import Interaction from '../../interaction/src/app';
import Layers from '../../layers/src/app';

export const BASIC_EXAMPLES = 'basicExamples';
export const STANDALONE_EXAMPLES = 'standalonExamples';

export const DEFAULT_EXAMPLE = 'markerExample';

// TOC
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
    name: 'Advanced Examples',
    children: [
      {
        path: 'controlsExample',
        name: 'Controls',
        component: Controls
      },
      {
        path: 'geoJsonExample',
        name: 'GeoJSON',
        component: GeoJson
      },
      {
        path: 'interactionExample',
        name: 'Interaction',
        component: Interaction
      },
      {
        path: 'layersExample',
        name: 'Layers',
        component: Layers
      }
    ]
  }
];
