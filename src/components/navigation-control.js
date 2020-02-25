// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import BaseControl from './base-control';

import MapState from '../utils/map-state';
import {LINEAR_TRANSITION_PROPS} from '../utils/map-controller';

import deprecateWarn from '../utils/deprecate-warn';
import {compareVersions} from '../utils/version';

import type {BaseControlProps} from './base-control';

const noop = () => {};

const propTypes = Object.assign({}, BaseControl.propTypes, {
  // Custom className
  className: PropTypes.string,
  // Callbacks fired when the user interacted with the map. The object passed to the callbacks
  // contains viewport properties such as `longitude`, `latitude`, `zoom` etc.
  onViewStateChange: PropTypes.func,
  onViewportChange: PropTypes.func,
  // Show/hide compass button
  showCompass: PropTypes.bool,
  // Show/hide zoom buttons
  showZoom: PropTypes.bool,
  // Custom labels assigned to the controls
  zoomInLabel: PropTypes.string,
  zoomOutLabel: PropTypes.string,
  compassLabel: PropTypes.string
});

const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  showCompass: true,
  showZoom: true,
  zoomInLabel: 'Zoom In',
  zoomOutLabel: 'Zoom Out',
  compassLabel: 'Reset North'
});

export type NavigationControlProps = BaseControlProps & {
  className: string,
  onViewStateChange?: Function,
  onViewportChange?: Function,
  showCompass: boolean,
  showZoom: boolean,
  zoomInLabel: string,
  zoomOutLabel: string,
  compassLabel: string
};

type ViewportProps = {
  longitude: number,
  latitude: number,
  zoom: number,
  pitch: number,
  bearing: number
};

// Mapbox version flags. CSS classes were changed in certain versions.
const VERSION_LEGACY = 1;
const VERSION_1_6 = 2;

function getUIVersion(mapboxVersion: string): number {
  return compareVersions(mapboxVersion, '1.6.0') >= 0 ? VERSION_1_6 : VERSION_LEGACY;
}

/*
 * PureComponent doesn't update when context changes, so
 * implementing our own shouldComponentUpdate here.
 */
export default class NavigationControl extends BaseControl<
  NavigationControlProps,
  *,
  HTMLDivElement
> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props: NavigationControlProps) {
    super(props);
    // Check for deprecated props
    deprecateWarn(props);
  }

  _uiVersion: number;

  _updateViewport(opts: $Shape<ViewportProps>) {
    const {viewport} = this._context;
    const mapState = new MapState(Object.assign({}, viewport, opts));
    const viewState = Object.assign({}, mapState.getViewportProps(), LINEAR_TRANSITION_PROPS);

    const onViewportChange = this.props.onViewportChange || this._context.onViewportChange || noop;
    const onViewStateChange =
      this.props.onViewStateChange || this._context.onViewStateChange || noop;

    // Call new style callback
    onViewStateChange({viewState});

    // Call old style callback
    onViewportChange(viewState);
  }

  _onZoomIn = () => {
    this._updateViewport({zoom: this._context.viewport.zoom + 1});
  };

  _onZoomOut = () => {
    this._updateViewport({zoom: this._context.viewport.zoom - 1});
  };

  _onResetNorth = () => {
    this._updateViewport({bearing: 0, pitch: 0});
  };

  _renderCompass() {
    const {bearing} = this._context.viewport;
    const style = {transform: `rotate(${-bearing}deg)`};

    return this._uiVersion === VERSION_1_6 ? (
      <span className="mapboxgl-ctrl-icon" aria-hidden="true" style={style} />
    ) : (
      <span className="mapboxgl-ctrl-compass-arrow" style={style} />
    );
  }

  _renderButton(type: string, label: string, callback: Function, children: any) {
    return (
      <button
        key={type}
        className={`mapboxgl-ctrl-icon mapboxgl-ctrl-${type}`}
        type="button"
        title={label}
        onClick={callback}
      >
        {children || <span className="mapboxgl-ctrl-icon" aria-hidden="true" />}
      </button>
    );
  }

  _render() {
    const {className, showCompass, showZoom, zoomInLabel, zoomOutLabel, compassLabel} = this.props;

    if (!this._uiVersion) {
      // map may not exist if context is provided by user application (e.g. DeckGL)
      const {map} = this._context;
      this._uiVersion = getUIVersion(map && map.version);
    }

    return (
      <div className={`mapboxgl-ctrl mapboxgl-ctrl-group ${className}`} ref={this._containerRef}>
        {showZoom && this._renderButton('zoom-in', zoomInLabel, this._onZoomIn)}
        {showZoom && this._renderButton('zoom-out', zoomOutLabel, this._onZoomOut)}
        {showCompass &&
          this._renderButton('compass', compassLabel, this._onResetNorth, this._renderCompass())}
      </div>
    );
  }
}
