import autobind from '../utils/autobind';
import {window} from './globals';
import Hammer from 'hammerjs';

const ua = typeof window.navigator !== 'undefined' ?
  window.navigator.userAgent.toLowerCase() : '';
const firefox = ua.indexOf('firefox') !== -1;

/**
 * A class that extends Hammer.Input to handle both pointer and wheel events
 * Hammer.js does not handle mouse wheel, so we need to add our own listener
 */
export default class EventInput extends Hammer.PointerEventInput {

  constructor(...opts) {
    super(...opts);

    this.state = {
      mouseWheelPos: null
    };

    autobind(this);

    // Add aditional event listeners
    this.element.addEventListener('wheel', this._onWheel, false);
    this.element.addEventListener('mousewheel', this._onWheel, false);
  }

  destroy() {
    super.destroy();
    this.element.removeEventListener('wheel', this._onWheel);
    this.element.removeEventListener('mousewheel', this._onWheel);
  }

  setState(settings) {
    Object.assign(this.state, settings);
  }

  /* eslint-disable complexity, max-statements */
  _onWheel(event) {
    event.preventDefault();
    let value = event.deltaY;
    // Firefox doubles the values on retina screens...
    if (firefox && event.deltaMode === window.WheelEvent.DOM_DELTA_PIXEL) {
      value /= window.devicePixelRatio;
    }
    if (event.deltaMode === window.WheelEvent.DOM_DELTA_LINE) {
      value *= 40;
    }

    let type = this.state.mouseWheelType;
    let timeout = this.state.mouseWheelTimeout;
    let lastValue = this.state.mouseWheelLastValue;
    let time = this.state.mouseWheelTime;

    const now = (window.performance || Date).now();
    const timeDelta = now - (time || 0);

    const pos = {x: event.clientX, y: event.clientY};
    time = now;

    if (value !== 0 && value % 4.000244140625 === 0) {
      // This one is definitely a mouse wheel event.
      type = 'wheel';
      // Normalize this value to match trackpad.
      value = Math.floor(value / 4);
    } else if (value !== 0 && Math.abs(value) < 4) {
      // This one is definitely a trackpad event because it is so small.
      type = 'trackpad';
    } else if (timeDelta > 400) {
      // This is likely a new scroll action.
      type = null;
      lastValue = value;
      // Start a timeout in case this was a singular event, and delay it by up
      // to 40ms.
      timeout = window.setTimeout(function setTimeout() {
        const _type = 'wheel';
        this._wheel(-this.state.mouseWheelLastValue, this.state.mouseWheelPos);
        this.setState({mouseWheelType: _type});
      }.bind(this), 40);
    } else if (!this._type) {
      // This is a repeating event, but we don't know the type of event just
      // yet.
      // If the delta per time is small, we assume it's a fast trackpad;
      // otherwise we switch into wheel mode.
      type = Math.abs(timeDelta * value) < 200 ? 'trackpad' : 'wheel';

      // Make sure our delayed event isn't fired again, because we accumulate
      // the previous event (which was less than 40ms ago) into this event.
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = null;
        value += lastValue;
      }
    }

    // Slow down zoom if shift key is held for more precise zooming
    if (event.shiftKey && value) {
      value = value / 4;
    }

    // Only fire the callback if we actually know what type of scrolling device
    // the user uses.
    if (type) {
      this._wheel(-value, pos);
    }

    this.setState({
      mouseWheelTime: time,
      mouseWheelPos: pos,
      mouseWheelType: type,
      mouseWheelTimeout: timeout,
      mouseWheelLastValue: lastValue
    });
  }

  /* eslint-enable complexity, max-statements */

  _wheel(delta, pos) {
    this.manager.emit('wheel', {
      center: pos,
      target: this.element,
      delta
    });
  }
}
