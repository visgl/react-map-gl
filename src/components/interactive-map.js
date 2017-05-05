import {PureComponent, createElement} from 'react';
import PropTypes from 'prop-types';
import autobind from '../utils/autobind';

import StaticMap from './static-map';
import MapControls from './map-controls';
import MapState, {MAPBOX_MAX_PITCH, MAPBOX_MAX_ZOOM} from '../utils/map-state';
import {PerspectiveMercatorViewport} from 'viewport-mercator-project';

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

  /** Advanced features */
  // Contraints for displaying the map. If not met, then the map is hidden.
  displayConstraints: PropTypes.object.isRequired,
  // A React component class definition to replace the default map controls
  ControllerClass: PropTypes.func
});

const defaultProps = Object.assign({}, StaticMap.defaultProps, {
  onChangeViewport: null,

  /** Viewport constraints */
  maxZoom: MAPBOX_MAX_ZOOM,
  minZoom: 0,
  maxPitch: MAPBOX_MAX_PITCH,
  minPitch: 0,

  displayConstraints: {
    maxZoom: MAPBOX_MAX_ZOOM,
    maxPitch: MAPBOX_MAX_PITCH
  },
  ControllerClass: MapControls
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

  // TODO - Remove once Viewport alternative is good enough
  _getMap() {
    return this._map._getMap();
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
    const {width, height, ControllerClass} = this.props;
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

    return (
      createElement(ControllerClass, Object.assign({}, this.props, {
        key: 'map-controls',
        style: {position: 'relative'},
        mapState: new MapState(this.props)
      }), [
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

