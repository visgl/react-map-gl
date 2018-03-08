import {PureComponent, createElement} from 'react';
import PropTypes from 'prop-types';

import StaticMap from './static-map';
import {MAPBOX_LIMITS} from '../utils/map-state';
import WebMercatorViewport from 'viewport-mercator-project';

import TransitionManager from '../utils/transition-manager';

import {EventManager} from 'mjolnir.js';
import MapControls from '../utils/map-controls';
import config from '../config';
import deprecateWarn from '../utils/deprecate-warn';

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
   * `onViewportChange` callback is fired when the user interacted with the
   * map. The object passed to the callback contains viewport properties
   * such as `longitude`, `latitude`, `zoom` etc.
   */
  onViewportChange: PropTypes.func,

  /** Viewport transition **/
  // transition duration for viewport change
  transitionDuration: PropTypes.number,
  // TransitionInterpolator instance, can be used to perform custom transitions.
  transitionInterpolator: PropTypes.object,
  // type of interruption of current transition on update.
  transitionInterruption: PropTypes.number,
  // easing function
  transitionEasing: PropTypes.func,
  // transition status update functions
  onTransitionStart: PropTypes.func,
  onTransitionInterrupt: PropTypes.func,
  onTransitionEnd: PropTypes.func,

  /** Enables control event handling */
  // Scroll to zoom
  scrollZoom: PropTypes.bool,
  // Drag to pan
  dragPan: PropTypes.bool,
  // Drag to rotate
  dragRotate: PropTypes.bool,
  // Double click to zoom
  doubleClickZoom: PropTypes.bool,
  // Multitouch zoom
  touchZoom: PropTypes.bool,
  // Multitouch rotate
  touchRotate: PropTypes.bool,
  // Keyboard
  keyboard: PropTypes.bool,

 /**
    * Called when the map is hovered over.
    * @callback
    * @param {Object} event - The mouse event.
    * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
    * @param {Array} event.features - The features under the pointer, using Mapbox's
    * queryRenderedFeatures API:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To make a layer interactive, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    */
  onHover: PropTypes.func,
  /**
    * Called when the map is clicked.
    * @callback
    * @param {Object} event - The mouse event.
    * @param {[Number, Number]} event.lngLat - The coordinates of the pointer
    * @param {Array} event.features - The features under the pointer, using Mapbox's
    * queryRenderedFeatures API:
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
  visibilityConstraints: PropTypes.shape({
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    minPitch: PropTypes.number,
    maxPitch: PropTypes.number
  }),
  // A map control instance to replace the default map controls
  // The object must expose one property: `events` as an array of subscribed
  // event names; and two methods: `setState(state)` and `handle(event)`
  mapControls: PropTypes.shape({
    events: PropTypes.arrayOf(PropTypes.string),
    handleEvent: PropTypes.func
  })
});

const getDefaultCursor = ({isDragging, isHovering}) => isDragging ?
  config.CURSOR.GRABBING :
  (isHovering ? config.CURSOR.POINTER : config.CURSOR.GRAB);

const defaultProps = Object.assign({},
  StaticMap.defaultProps, MAPBOX_LIMITS, TransitionManager.defaultProps,
  {
    onViewportChange: null,
    onClick: null,
    onHover: null,

    scrollZoom: true,
    dragPan: true,
    dragRotate: true,
    doubleClickZoom: true,

    clickRadius: 0,
    getCursor: getDefaultCursor,

    visibilityConstraints: MAPBOX_LIMITS
  }
);

const childContextTypes = {
  viewport: PropTypes.instanceOf(WebMercatorViewport),
  isDragging: PropTypes.bool,
  eventManager: PropTypes.object
};

export default class InteractiveMap extends PureComponent {

  static supported() {
    return StaticMap.supported();
  }

  constructor(props) {
    super(props);
    // Check for deprecated props
    deprecateWarn(props);

    this.state = {
      // Whether the cursor is down
      isDragging: false,
      // Whether the cursor is over a clickable feature
      isHovering: false
    };

    // If props.mapControls is not provided, fallback to default MapControls instance
    // Cannot use defaultProps here because it needs to be per map instance
    this._mapControls = props.mapControls || new MapControls();

    this._eventManager = new EventManager(null, {rightButton: true});

    this.getMap = this.getMap.bind(this);
    this.queryRenderedFeatures = this.queryRenderedFeatures.bind(this);
    this._checkVisibilityConstraints = this._checkVisibilityConstraints.bind(this);
    this._getFeatures = this._getFeatures.bind(this);
    this._onInteractiveStateChange = this._onInteractiveStateChange.bind(this);
    this._getPos = this._getPos.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseClick = this._onMouseClick.bind(this);
    this._eventCanvasLoaded = this._eventCanvasLoaded.bind(this);
    this._staticMapLoaded = this._staticMapLoaded.bind(this);
  }

  getChildContext() {
    return {
      viewport: new WebMercatorViewport(this.props),
      isDragging: this.state.isDragging,
      eventManager: this._eventManager
    };
  }

  componentDidMount() {
    const eventManager = this._eventManager;

    // Register additional event handlers for click and hover
    eventManager.on('mousemove', this._onMouseMove);
    eventManager.on('click', this._onMouseClick);

    this._mapControls.setOptions(Object.assign({}, this.props, {
      onStateChange: this._onInteractiveStateChange,
      eventManager
    }));

    this._transitionManager = new TransitionManager(this.props);
  }

  componentWillUpdate(nextProps) {
    this._mapControls.setOptions(nextProps);
    this._transitionManager.processViewportChange(nextProps);
  }

  getMap() {
    return this._map ? this._map.getMap() : null;
  }

  queryRenderedFeatures(geometry, options) {
    return this._map.queryRenderedFeatures(geometry, options);
  }

  // Checks a visibilityConstraints object to see if the map should be displayed
  _checkVisibilityConstraints(props) {
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
    const {offsetCenter: {x, y}} = event;
    return [x, y];
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
        const viewport = new WebMercatorViewport(this.props);
        event.lngLat = viewport.unproject(pos);
        event.features = features;

        this.props.onHover(event);
      }
    }
  }

  _onMouseClick(event) {
    if (this.props.onClick) {
      const pos = this._getPos(event);
      const viewport = new WebMercatorViewport(this.props);
      event.lngLat = viewport.unproject(pos);
      event.features = this._getFeatures({pos, radius: this.props.clickRadius});

      this.props.onClick(event);
    }
  }

  _eventCanvasLoaded(ref) {
    // This will be called with `null` after unmount, releasing event manager resource
    this._eventManager.setElement(ref);
  }

  _staticMapLoaded(ref) {
    this._map = ref;
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
        ref: this._eventCanvasLoaded,
        style: eventCanvasStyle
      },
        createElement(StaticMap, Object.assign({}, this.props,
          this._transitionManager && this._transitionManager.getViewportInTransition(),
          {
            visible: this._checkVisibilityConstraints(this.props),
            ref: this._staticMapLoaded,
            children: this.props.children
          }
        ))
      )
    );
  }
}

InteractiveMap.displayName = 'InteractiveMap';
InteractiveMap.propTypes = propTypes;
InteractiveMap.defaultProps = defaultProps;
InteractiveMap.childContextTypes = childContextTypes;
