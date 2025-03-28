import type {Transform} from '../types/internal';
import type {ViewState, LngLat} from '../types/common';
import { applyViewStateToTransform } from '../utils/transform';

export type ProxyTransform = Transform & {
  $internalUpdate: boolean;
  $proposedTransform: Transform | null;
  $reactViewState: Partial<ViewState>;
};

// These are Transform class methods that should not trigger any proxied getter/setter
// See https://github.com/mapbox/mapbox-gl-js/blob/main/src/ui/handler_manager.ts
const unproxiedMethods = new Set([
  '_calcMatrices',
  '_calcFogMatrices',
  '_updateCameraState',
  '_updateSeaLevelZoom'
]);

/**
 * Mapbox map is stateful.
 * During method calls/user interactions, map.transform is mutated and
 * deviate from user-supplied props.
 * In order to control the map reactively, we trap the transform mutations
 * with a proxy, which reflects the view state resolved from
 * both user-supplied props and the underlying state
 */
export function createProxyTransform(tr: Transform): ProxyTransform {
  let internalUpdate = false;
  let reactViewState: Partial<ViewState> = {};
  /**
   * Reflects view state set by react props
   * This is the transform seen by painter, style etc.
   */
  const controlledTransform: Transform = tr;
  /** Populated during camera move (handler/easeTo) if there is a discrepency between react props and proposed view state
   * This is the transform seen by input handlers
   */
  let proposedTransform: Transform | null = null;

  const handlers: ProxyHandler<Transform> = {
    get(target: Transform, prop: string) {
      // Props added by us
      if (prop === '$reactViewState') {
        return reactViewState;
      }
      if (prop === '$proposedTransform') {
        return proposedTransform;
      }
      if (prop === '$internalUpdate') {
        return internalUpdate;
      }

      // Ugly - this is indirectly called from HandlerManager bypassing zoom setter
      if (prop === '_setZoom') {
        return (z: number) => {
          if (internalUpdate) {
            proposedTransform?.[prop](z);
          }
          if (!Number.isFinite(reactViewState.zoom)) {
            controlledTransform[prop](z);
          }
        };
      }

      if (
        internalUpdate &&
        prop === '_translateCameraConstrained' &&
        Number.isFinite(reactViewState.zoom)
      ) {
        // mapbox is about to start mutating transform, and the view state is controlled by React props
        proposedTransform = proposedTransform || controlledTransform.clone();
      }

      // When this function is executed, it updates both transforms respectively
      if (unproxiedMethods.has(prop)) {
        return function (...parms: unknown[]) {
          proposedTransform?.[prop](...parms);
          controlledTransform[prop](...parms);
        };
      }
      if (internalUpdate && proposedTransform) {
        return proposedTransform[prop];
      }
      return controlledTransform[prop];
    },

    set(target: Transform, prop: string, value: unknown) {
      // Props added by us
      if (prop === '$reactViewState') {
        reactViewState = value as Partial<ViewState>;
        applyViewStateToTransform(controlledTransform, reactViewState);
        return true;
      }
      if (prop === '$proposedTransform') {
        proposedTransform = value as Transform;
        return true;
      }
      if (prop === '$internalUpdate') {
        internalUpdate = value as boolean;
        return true;
      }

      // Controlled props
      let controlledValue = value;
      if (prop === 'center' || prop === '_center') {
        // @ts-expect-error LngLat constructor is not typed
        controlledValue = new value.constructor(value.lng, value.lat);
        if (Number.isFinite(reactViewState.longitude)) {
          (controlledValue as LngLat).lng = reactViewState.longitude;
        }
        if (Number.isFinite(reactViewState.latitude)) {
          (controlledValue as LngLat).lat = reactViewState.latitude;
        }
      } else if (prop === 'zoom' || prop === '_zoom' || prop === '_seaLevelZoom') {
        if (Number.isFinite(reactViewState.zoom)) {
          controlledValue = controlledTransform[prop];
        }
      } else if (prop === '_centerAltitude') {
        if (Number.isFinite(reactViewState.altitude)) {
          controlledValue = controlledTransform[prop];
        }
      } else if (prop === 'pitch' || prop === '_pitch') {
        if (Number.isFinite(reactViewState.pitch)) {
          controlledValue = controlledTransform[prop];
        }
      } else if (prop === 'bearing' || prop === 'rotation' || prop === 'angle') {
        if (Number.isFinite(reactViewState.bearing)) {
          controlledValue = controlledTransform[prop];
        }
      }

      if (internalUpdate && proposedTransform) {
        proposedTransform[prop] = value;
      }

      controlledTransform[prop] = controlledValue;
      return true;
    }
  };
  return new Proxy(tr, handlers) as ProxyTransform;
}
