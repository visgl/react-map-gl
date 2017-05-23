import {PureComponent, createElement} from 'react';
import PropTypes from 'prop-types';
import autobind from '../utils/autobind';

import StaticMap from './static-map';
import {MAPBOX_MAX_PITCH, MAPBOX_MAX_ZOOM} from '../utils/map-state';
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

  /**
   * `onChangeViewport` callback is fired when the user interacted with the
   * map. The object passed to the callback contains viewport properties
   * such as `longitude`, `latitude`, `zoom` and additional interaction
   * state information.
   */
  onChangeViewport: PropTypes.func,

  /** Enables control event handling */
  // Scroll to zoom
  scrollZoomEnabled: PropTypes.bool,
  // Drag to pan
  dragPanEnabled: PropTypes.bool,
  // Drag to rotate
  dragRotateEnabled: PropTypes.bool,
  // Double click to zoom
  doubleClickZoomEnabled: PropTypes.bool,
  // Pinch to zoom / rotate
  touchZoomRotateEnabled: PropTypes.bool,

 /**
    * Called when a feature is hovered over. Uses Mapbox's
    * queryRenderedFeatures API to find features under the pointer:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To make a layer interactive, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    * @callback
    * @param {array} features - The array of features the mouse is over.
    */
  onHover: PropTypes.func,
  /**
    * Called when a feature is clicked on. Uses Mapbox's
    * queryRenderedFeatures API to find features under the pointer:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To make a layer interactive, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    */
  onClick: PropTypes.func,

  /** Radius to detect features around a clicked point. Defaults to 0. */
  clickRadius: PropTypes.number,

  /** Accessor that returns a cursor style to show interactive state */
  getCursor: PropTypes.func,

  /** Advanced features */
  // Contraints for displaying the map. If not met, then the map is hidden.
  // Experimental! May be changed in minor version updates.
  visibilityConstraints: PropTypes.object.isRequired,
  // A map control instance to replace the default map controls
  // The object must expose one property: `events` as an array of subscribed
  // event names; and two methods: `setState(state)` and `handle(event)`
  mapControls: PropTypes.shape({
    events: PropTypes.arrayOf(PropTypes.string),
    handle: PropTypes.func
  })
});

const defaultProps = Object.assign({}, StaticMap.defaultProps, {
  onChangeViewport: null,
  onClick: null,
  onHover: null,

  scrollZoomEnabled: true,
  dragPanEnabled: true,
  dragRotateEnabled: true,
  doubleClickZoomEnabled: true,
  touchZoomRotateEnabled: true,

  clickRadius: 0,
  getCursor: ({isDragging, isHovering}) => isDragging ? config.CURSOR.GRABBING :
    (isHovering ? config.CURSOR.POINTER : config.CURSOR.GRAB),

  /** Viewport constraints */
  maxZoom: MAPBOX_MAX_ZOOM,
  minZoom: 0,
  maxPitch: MAPBOX_MAX_PITCH,
  minPitch: 0,

  visibilityConstraints: {
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

    this.state = {
      // Whether the cursor is down
      isDragging: false,
      // Whether the cursor is over a clickable feature
      isHovering: false
    };
  }

  getChildContext() {
    return {
      viewport: new PerspectiveMercatorViewport(this.props)
    };
  }

  componentDidMount() {
    const {eventCanvas} = this.refs;
    const {mapControls} = this.props;

    // Register event handlers defined by map controls
    const events = {};
    mapControls.events.forEach(eventName => {
      events[eventName] = this._handleEvent;
    });

    const eventManager = new EventManager(eventCanvas, {events});

    // Register event handlers for click and hover
    eventManager.on('mousemove', this._onMouseMove);
    eventManager.on('click', this._onMouseClick);
    this._eventManager = eventManager;
  }

  componentWillUnmount() {
    if (this._eventManager) {
      // Must destroy because hammer adds event listeners to window
      this._eventManager.destroy();
    }
  }

  _handleEvent(event) {
    const controlOptions = Object.assign({
      onChangeState: this._onInteractiveStateChange
    }, this.props);
    return this.props.mapControls.handle(event, controlOptions);
  }

  getMap() {
    return this._map.getMap();
  }

  queryRenderedFeatures(geometry, options) {
    return this._map.queryRenderedFeatures(geometry, options);
  }

  // Checks a visibilityConstraints object to see if the map should be displayed
  checkVisibilityConstraints(props) {
    const capitalize = s => s[0].toUpperCase() + s.slice(1);

    const {visibilityConstraints} = props;
    for (const propName in props) {
      const capitalizedPropName = capitalize(propName);
      const minPropName = `min${capitalizedPropName}`;
      const maxPropName = `max${capitalizedPropName}`;

      if (minPropName in visibilityConstraints &&
        props[propName] < visibilityConstraints[minPropName]) {
        return false;
      }
      if (maxPropName in visibilityConstraints &&
        props[propName] > visibilityConstraints[maxPropName]) {
        return false;
      }
    }
    return true;
  }

  _getFeatures({pos, radius}) {
    let features;
    if (radius) {
      // Radius enables point features, like marker symbols, to be clicked.
      const size = radius;
      const bbox = [[pos[0] - size, pos[1] + size], [pos[0] + size, pos[1] - size]];
      features = this._map.queryRenderedFeatures(bbox);
    } else {
      features = this._map.queryRenderedFeatures(pos);
    }
    return features;
  }

  _onInteractiveStateChange({isDragging = false}) {
    if (isDragging !== this.state.isDragging) {
      this.setState({isDragging});
    }
  }

  // HOVER AND CLICK
  _getPos(event) {
    const {srcEvent: {clientX, clientY}, target} = event;
    const rect = target.getBoundingClientRect();
    return [
      clientX - rect.left - target.clientLeft,
      clientY - rect.top - target.clientTop
    ];
  }

  _onMouseMove(event) {
    if (!this.state.isDragging) {
      const pos = this._getPos(event);
      const features = this._getFeatures({pos, radius: this.props.clickRadius});

      const isHovering = features && features.length > 0;
      if (isHovering !== this.state.isHovering) {
        this.setState({isHovering});
      }

      if (this.props.onHover) {
        const viewport = new PerspectiveMercatorViewport(this.props);
        event.lngLat = viewport.unproject(pos);
        event.features = features;

        this.props.onHover(event);
      }
    }
  }

  _onMouseClick(event) {
    if (this.props.onClick) {
      const pos = this._getPos(event);
      const viewport = new PerspectiveMercatorViewport(this.props);
      event.lngLat = viewport.unproject(pos);
      event.features = this._getFeatures({pos, radius: this.props.clickRadius});

      this.props.onClick(event);
    }
  }

  render() {
    const {width, height, getCursor} = this.props;

    const eventCanvasStyle = {
      width,
      height,
      position: 'relative',
      cursor: getCursor(this.state)
    };

    return (
      createElement('div', {
        key: 'map-controls',
        ref: 'eventCanvas',
        style: eventCanvasStyle
      },
        createElement(StaticMap, Object.assign({}, this.props, {
          visible: this.checkVisibilityConstraints(this.props),
          ref: map => {
            this._map = map;
          }
        }))
      )
    );
  }
}

InteractiveMap.displayName = 'InteractiveMap';
InteractiveMap.propTypes = propTypes;
InteractiveMap.defaultProps = defaultProps;
InteractiveMap.childContextTypes = StaticMap.childContextTypes;
