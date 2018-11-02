/* global window */
import React, {PureComponent} from 'react';
import autobind from 'react-autobind';
import {BaseControl} from 'react-map-gl';

export default class InfoPanel extends BaseControl {

  static defaultProps = {
    captureScroll: true,
    captureDrag: true,
    captureClick: true,
    captureDoubleClick: true
  };

  constructor(props) {
    super(props);
    this.state = {hasFocus: false};
    this._blurTimer = null;
    autobind(this);
  }

  _onFocus() {
    window.clearTimeout(this._blurTimer);
    this.setState({hasFocus: true});
  }

  _onBlur() {
    // New focus is not yet available when blur event fires.
    // Wait a bit and if no onfocus event is fired, remove focus
    this._blurTimer = window.setTimeout(() => {
      this.setState({hasFocus: false});
    }, 1);
  }

  _render() {
    const {hasFocus} = this.state;

    return (
      <div className={`options-panel top-right ${hasFocus ? 'focus' : ''}`}
        ref={this._containerRef}
        tabIndex="0"
        onFocus={this._onFocus}
        onBlur={this._onBlur} >

        {this.props.children}

      </div>
    );
  }
}
