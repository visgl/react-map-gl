import {Component, createElement} from 'react';
import PropTypes from 'prop-types';
import autobind from '../utils/autobind';

import {PerspectiveMercatorViewport} from 'viewport-mercator-project';
import MapState from '../utils/map-state';

const propTypes = {
  /**
    * `onChangeViewport` callback is fired when the user interacted with the
    * map. The object passed to the callback contains `latitude`,
    * `longitude` and `zoom` and additional state information.
    */
  onChangeViewport: PropTypes.func.isRequired
};

const defaultProps = {
  onChangeViewport: () => {}
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
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.context.viewport.bearing !== nextContext.viewport.bearing;
  }

  _updateViewport(opts) {
    const {viewport} = this.context;
    const mapState = new MapState(Object.assign({}, viewport, opts));
    this.props.onChangeViewport(mapState.getViewportProps());
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
