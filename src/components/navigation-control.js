import {createElement} from 'react';
import PropTypes from 'prop-types';
import BaseControl from './base-control';
import autobind from '../utils/autobind';

import MapState from '../utils/map-state';

import deprecateWarn from '../utils/deprecate-warn';

const propTypes = Object.assign({}, BaseControl.propTypes, {
  /**
    * `onViewportChange` callback is fired when the user interacted with the
    * map. The object passed to the callback contains `latitude`,
    * `longitude` and `zoom` and additional state information.
    */
  onViewportChange: PropTypes.func.isRequired
});

const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  onViewportChange: () => {}
});

/*
 * PureComponent doesn't update when context changes, so
 * implementing our own shouldComponentUpdate here.
 */
export default class NavigationControl extends BaseControl {

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
      className: 'mapboxgl-ctrl-compass-arrow',
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

    const {className} = this.props;

    return createElement('div', {
      className: `mapboxgl-ctrl mapboxgl-ctrl-group ${className}`,
      ref: this._onContainerLoad
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
