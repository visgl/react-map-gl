import {Component, createElement} from 'react';
import PropTypes from 'prop-types';
import autobind from '../utils/autobind';

import {PerspectiveMercatorViewport} from 'viewport-mercator-project';
import MapState from '../utils/map-state';

import deprecateWarn from '../utils/deprecate-warn';

const propTypes = {
  /**
    * `onViewportChange` callback is fired when the user interacted with the
    * map. The object passed to the callback contains `latitude`,
    * `longitude` and `zoom` and additional state information.
    */
  onViewportChange: PropTypes.func.isRequired
};

const defaultProps = {
  onViewportChange: () => {}
};

const contextTypes = {
  viewport: PropTypes.instanceOf(PerspectiveMercatorViewport)
};

/*
 * PureComponent doesn't update when context changes, so
 * implementing our own shouldComponentUpdate here.
 */
export default class NavigationControl extends Component {

  constructor(props) {
    super(props);
    autobind(this);
    // Check for deprecated props
    deprecateWarn(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.context.viewport.bearing !== nextContext.viewport.bearing;
  }

  _updateViewport(opts) {
    const {viewport} = this.context;
    const mapState = new MapState(Object.assign({}, viewport, opts));
    // TODO(deprecate): remove this check when `onChangeViewport` gets deprecated
    const onViewportChange = this.props.onChangeViewport || this.props.onViewportChange;
    onViewportChange(mapState.getViewportProps());
  }

  _onZoomIn() {
    this._updateViewport({zoom: this.context.viewport.zoom + 1});
  }

  _onZoomOut() {
    this._updateViewport({zoom: this.context.viewport.zoom - 1});
  }

  _onResetNorth() {
    this._updateViewport({bearing: 0});
  }

  _renderCompass() {
    const {bearing} = this.context.viewport;
    return createElement('span', {
      className: 'arrow',
      style: {transform: `rotate(${bearing}deg)`}
    });
  }

  _renderButton(type, label, callback, children) {
    return createElement('button', {
      key: type,
      className: `mapboxgl-ctrl-icon mapboxgl-ctrl-${type}`,
      type: 'button',
      title: label,
      onClick: callback,
      children
    });
  }

  render() {
    return createElement('div', {
      className: 'mapboxgl-ctrl mapboxgl-ctrl-group'
    }, [
      this._renderButton('zoom-in', 'Zoom In', this._onZoomIn),
      this._renderButton('zoom-out', 'Zoom Out', this._onZoomOut),
      this._renderButton('compass', 'Reset North', this._onResetNorth, this._renderCompass())
    ]);
  }
}

NavigationControl.displayName = 'NavigationControl';
NavigationControl.propTypes = propTypes;
NavigationControl.defaultProps = defaultProps;
NavigationControl.contextTypes = contextTypes;
