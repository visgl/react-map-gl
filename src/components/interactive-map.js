import {PureComponent, createElement} from 'react';
import PropTypes from 'prop-types';
import autobind from '../utils/autobind';

import StaticMap from './static-map';
import MapState, {MAPBOX_MAX_PITCH, MAPBOX_MAX_ZOOM} from '../utils/map-state';
import {PerspectiveMercatorViewport} from 'viewport-mercator-project';

import EventManager from '../utils/event-manager/event-manager';
import MapControls from '../utils/map-controls';
import config from '../config';

const propTypes = Object.assign({}, StaticMap.propTypes, {
  // Additional props on top of StaticMap

  /** Viewport constraints */
  // Max zoom level
  maxZoom: PropTypes.number,
  // Min zoom level
  minZoom: PropTypes.number,
  // Max pitch in degrees
  maxPitch: PropTypes.number,
  // Min pitch in degrees
  minPitch: PropTypes.number,

  /** Interaction states, required to calculate change during transform
   * These should be managed by the map controller and updated via the
   * `onChangeViewport` callback
   */
  startPanLngLat: PropTypes.arrayOf(PropTypes.number),
  startZoomLngLat: PropTypes.arrayOf(PropTypes.number),
  startBearing: PropTypes.number,
  startPitch: PropTypes.number,
  startZoom: PropTypes.number,

  /**
   * `onChangeViewport` callback is fired when the user interacted with the
   * map. The object passed to the callback contains viewport properties
   * such as `longitude`, `latitude`, `zoom` and additional interaction
   * state information.
   */
  onChangeViewport: PropTypes.func,

  /** Enables perspective control event handling */
  perspectiveEnabled: PropTypes.bool,

  /**
    * Is the component currently being dragged. This is used to show/hide the
    * drag cursor. Also used as an optimization in some overlays by preventing
    * rendering while dragging.
    */
  isHovering: PropTypes.bool,
  isDragging: PropTypes.bool,

  /** Advanced features */
  // Contraints for displaying the map. If not met, then the map is hidden.
  displayConstraints: PropTypes.object.isRequired,
  // A map control instance to replace the default map controls
  // The object must expose one property: `events` as an array of subscribed
  // event names; and two methods: `setState(state)` and `handle(event)`
  mapControls: PropTypes.shape({
    events: PropTypes.arrayOf(PropTypes.string),
    setState: PropTypes.func,
    handle: PropTypes.func
  })
});

const defaultProps = Object.assign({}, StaticMap.defaultProps, {
  onChangeViewport: null,
  perspectiveEnabled: false,

  /** Viewport constraints */
  maxZoom: MAPBOX_MAX_ZOOM,
  minZoom: 0,
  maxPitch: MAPBOX_MAX_PITCH,
  minPitch: 0,

  displayConstraints: {
    maxZoom: MAPBOX_MAX_ZOOM,
    maxPitch: MAPBOX_MAX_PITCH
  },

  mapControls: new MapControls()
});

export default class InteractiveMap extends PureComponent {

  static supported() {
    return StaticMap.supported();
  }

  constructor(props) {
    super(props);
    autobind(this);
  }

  getChildContext() {
    return {
      viewport: new PerspectiveMercatorViewport(this.props)
    };
  }

  componentDidMount() {
    // Register event handlers
    const {eventCanvas} = this.refs;
    const {mapControls} = this.props;

    const events = {};
    mapControls.events.forEach(eventName => {
      events[eventName] = this._handleEvent;
    });

    this._eventManager = new EventManager(eventCanvas, {events});
  }

  componentWillUnmount() {
    if (this._eventManager) {
      // Must destroy because hammer adds event listeners to window
      this._eventManager.destroy();
    }
  }

  _handleEvent(event) {
    const {mapControls} = this.props;
    // MapControls only extracts the states that it recognizes.
    // This allows custom map controls to add new states and callbacks.
    mapControls.setState(Object.assign({}, this.props, {
      mapState: new MapState(this.props)
    }));

    return mapControls.handle(event);
  }

  // TODO - Remove once Viewport alternative is good enough
  _getMap() {
    return this._map._getMap();
  }

  // Calculate a cursor style to show that we are in "dragging state"
  _getCursor() {
    const isInteractive =
      this.props.onChangeViewport ||
      this.props.onClickFeature ||
      this.props.onHoverFeatures;

    if (!isInteractive) {
      return 'inherit';
    }
    if (this.props.isDragging) {
      return config.CURSOR.GRABBING;
    }
    if (this.props.isHovering) {
      return config.CURSOR.POINTER;
    }
    return config.CURSOR.GRAB;
  }

  // Checks a displayConstraints object to see if the map should be displayed
  checkDisplayConstraints(props) {
    const capitalize = s => s[0].toUpperCase() + s.slice(1);

    const {displayConstraints} = props;
    for (const propName in props) {
      const capitalizedPropName = capitalize(propName);
      const minPropName = `min${capitalizedPropName}`;
      const maxPropName = `max${capitalizedPropName}`;

      if (minPropName in displayConstraints && props[propName] < displayConstraints[minPropName]) {
        return false;
      }
      if (maxPropName in displayConstraints && props[propName] > displayConstraints[maxPropName]) {
        return false;
      }
    }
    return true;
  }

  render() {
    const {width, height} = this.props;
    const mapVisible = this.checkDisplayConstraints(this.props);
    const visibility = mapVisible ? 'visible' : 'hidden';
    const overlayContainerStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width,
      height,
      overflow: 'hidden'
    };

    const eventCanvasStyle = {
      width,
      height,
      position: 'relative',
      cursor: this._getCursor()
    };

    return (
      createElement('div', {
        key: 'map-controls',
        ref: 'eventCanvas',
        style: eventCanvasStyle
      }, [
        createElement(StaticMap, Object.assign({}, this.props, {
          key: 'map-static',
          style: {visibility},
          ref: map => {
            this._map = map;
          },
          children: null
        })),
        createElement('div', {
          key: 'map-overlays',
          // Same as static map's overlay container
          className: 'overlays',
          style: overlayContainerStyle,
          children: this.props.children
        })
      ])
    );
  }
}

InteractiveMap.displayName = 'InteractiveMap';
InteractiveMap.propTypes = propTypes;
InteractiveMap.defaultProps = defaultProps;
InteractiveMap.childContextTypes = StaticMap.childContextTypes;

