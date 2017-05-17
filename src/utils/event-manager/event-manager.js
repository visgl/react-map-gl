import {Manager} from 'hammerjs';
import WheelInput from './wheel-input';
import {
  BASIC_EVENT_ALIASES, EVENT_RECOGNIZER_MAP, RECOGNIZERS, GESTURE_EVENT_ALIASES
} from './constants';

/**
 * Single API for subscribing to events about both
 * basic input events (e.g. 'mousemove', 'touchstart', 'wheel')
 * and gestural input (e.g. 'click', 'tap', 'panstart').
 * Delegates event registration and handling to Hammer.js.
 */
export default class EventManager {
  constructor(element, options = {}) {
    // TODO: support overriding default RECOGNIZERS by passing
    // recognizers / configs, keyed to event name.

    this._onBasicInput = this._onBasicInput.bind(this);
    this.manager = new Manager(element, {recognizers: RECOGNIZERS})
      .on('hammer.input', this._onBasicInput);

    this.aliasedEventHandlers = {};

    // Handle mouse wheel events as well
    this.wheelInput = new WheelInput(element, event => {
      this.manager.emit('wheel', event);
    });
  }

  destroy() {
    this.wheelInput.destroy();
    this.manager.destroy();
  }

  /**
   * Register an event handler function to be called on `event`.
   * @param {string|Object} event   An event name (String) or map of event names to handlers
   * @param {Function} [handler]    The function to be called on `event`.
   */
  on(event, handler) {
    if (typeof event === 'string') {
      // Special handling for gestural events.
      const recognizerName = EVENT_RECOGNIZER_MAP[event];
      if (recognizerName) {
        // Enable recognizer for this event.
        this.manager.get(recognizerName).set({enable: true});
      }

      // Alias to a recognized gesture as necessary.
      const eventAlias = GESTURE_EVENT_ALIASES[event];
      if (eventAlias && !this.aliasedEventHandlers[event]) {
        const aliasedEventHandler = this._wrapAliasedGestureHandler(event);
        this.manager.on(eventAlias, aliasedEventHandler);
        this.aliasedEventHandlers[event] = aliasedEventHandler;
      }

      // Register event handler.
      this.manager.on(event, handler);
    } else {
      // If `event` is a map, call `on()` for each entry.
      for (const eventName in event) {
        this.on(eventName, event[eventName]);
      }
    }
  }

  /**
   * Deregister a previously-registered event handler.
   * @param {string|Object} event   An event name (String) or map of event names to handlers
   * @param {Function} [handler]    The function to be called on `event`.
   */
  off(event, handler) {
    if (typeof event === 'string') {
      // Deregister event handler.
      this.manager.off(event, handler);
    } else {
      // If `event` is a map, call `off()` for each entry.
      for (const eventName in event) {
        this.off(eventName, event[eventName]);
      }
    }
  }

  /**
   * Handle basic events using the 'hammer.input' Hammer.js API:
   * Before running Recognizers, Hammer emits a 'hammer.input' event
   * with the basic event info. This function emits all basic events
   * aliased to the "class" of event received.
   * See BASIC_EVENT_CLASSES basic event class definitions.
   */
  _onBasicInput(event) {
    const {srcEvent} = event;
    const eventAliases = BASIC_EVENT_ALIASES[srcEvent.type];
    if (eventAliases) {
      // fire all events aliased to srcEvent.type
      eventAliases.forEach(alias => {
        const emitEvent = Object.assign({}, event, {type: alias});
        this.manager.emit(alias, emitEvent);
      });
    }
  }

  _wrapAliasedGestureHandler(eventAlias) {
    return event => this.manager.emit(eventAlias, event);
  }

}
