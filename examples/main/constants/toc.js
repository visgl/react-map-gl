// Modules
import MainExample from '../views/main';
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

// TOC
export default [
  {
    type: BASIC_EXAMPLES,
    title: 'Basic Examples',
    children: [
      {
        id: 'mainExample',
        title: 'Main Example',
        component: MainExample
      },
      {
        id: 'notInteractive',
        title: 'Not Interactive',
        component: NotInteractiveExample
      },
      {
        id: 'customOverlay',
        title: 'Custom Overlay',
        component: CustomOverlayExample
      },
      {
        id: 'routeOverlay',
        title: 'Route Overlay',
        component: RouteOverlayExample
      },
      {
        id: 'styleDiffing',
        title: 'Style Diffing',
        component: StyleDiffingExample
      },
      {
        id: 'clickExample',
        title: 'Click',
        component: ClickExample
      }
    ]
  },
  {
    type: STANDALONE_EXAMPLES,
    title: 'Advanced Examples',
    children: [
      {
        id: 'controlsExample',
        title: 'Controls',
        component: Controls
      },
      {
        id: 'geoJsonExample',
        title: 'GeoJSON',
        component: GeoJson
      },
      {
        id: 'interactionExample',
        title: 'Interaction',
        component: Interaction
      },
      {
        id: 'layersExample',
        title: 'Layers',
        component: Layers
      }
    ]
  }
];
