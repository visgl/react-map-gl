import type {Transform} from '../types/internal';
import type {ViewState, LngLat} from '../types/common';
import {applyViewStateToTransform, isViewStateControlled} from '../utils/transform';

/**
 * Mapbox map is stateful.
 * During method calls/user interactions, map.transform is mutated and deviate from user-supplied props.
 * In order to control the map reactively, we trap the transform mutations with a proxy,
 * which reflects the view state resolved from both user-supplied props and the underlying state
 */
export type ProxyTransform = Transform & {
  $internalUpdate: boolean;
  $proposedTransform: Transform | null;
  $reactViewState: Partial<ViewState>;
};

// These are Transform class methods that:
// + do not mutate any view state properties
// + populate private members derived from view state properties
// They should always reflect the state of their owning instance and NOT trigger any proxied getter/setter
const unproxiedMethods = new Set([
  '_calcMatrices',
  '_calcFogMatrices',
  '_updateCameraState',
  '_updateSeaLevelZoom'
]);

export function createProxyTransform(tr: Transform): ProxyTransform {
  let internalUpdate = false;
  let reactViewState: Partial<ViewState> = {};
  /**
   * Reflects view state set by react props
   * This is the transform seen by painter, style etc.
   */
  const controlledTransform: Transform = tr;
  /** Populated during camera move (handler/easeTo) if there is a discrepency between react props and proposed view state
   * This is the transform seen by Mapbox's input handlers
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

      // Ugly - this method is called from HandlerManager bypassing zoom setter
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

      // Ugly - this method is called from HandlerManager and mutates transform._camera
      if (
        internalUpdate &&
        prop === '_translateCameraConstrained' &&
        isViewStateControlled(reactViewState)
      ) {
        proposedTransform = proposedTransform || controlledTransform.clone();
      }

      if (unproxiedMethods.has(prop)) {
        // When this function is executed, it updates both transforms respectively
        return function (...parms: unknown[]) {
          proposedTransform?.[prop](...parms);
          controlledTransform[prop](...parms);
        };
      }

      // Expose the proposed transform to input handlers
      if (internalUpdate && proposedTransform) {
        return proposedTransform[prop];
      }

      // Expose the controlled transform to renderer, markers, and event listeners
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
        if (Number.isFinite(reactViewState.longitude) || Number.isFinite(reactViewState.latitude)) {
          // @ts-expect-error LngLat constructor is not typed
          controlledValue = new value.constructor(
            reactViewState.longitude ?? (value as LngLat).lng,
            reactViewState.latitude ?? (value as LngLat).lat
          );
        }
      } else if (prop === 'zoom' || prop === '_zoom' || prop === '_seaLevelZoom') {
        if (Number.isFinite(reactViewState.zoom)) {
          controlledValue = controlledTransform[prop];
        }
      } else if (prop === '_centerAltitude') {
        if (Number.isFinite(reactViewState.elevation)) {
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

      // During camera update, we save view states that are overriden by controlled values in proposedTransform
      if (internalUpdate && controlledValue !== value) {
        proposedTransform = proposedTransform || controlledTransform.clone();
      }
      if (internalUpdate && proposedTransform) {
        proposedTransform[prop] = value;
      }

      // controlledTransform is not exposed to view state mutation
      controlledTransform[prop] = controlledValue;
      return true;
    }
  };
  return new Proxy(tr, handlers) as ProxyTransform;
}
