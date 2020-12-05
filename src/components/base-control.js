// @flow
// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import * as React from 'react';
import {PureComponent, createRef} from 'react';
import useMapControl, {mapControlDefaultProps, mapControlPropTypes} from './use-map-control';

import type {MjolnirEvent} from 'mjolnir.js';
import type {MapControlProps} from './use-map-control';

export type BaseControlProps = MapControlProps;

function Control(props: any) {
  const {instance} = props;
  const {context, containerRef} = useMapControl(instance.props, props);

  instance._context = context;
  instance._containerRef = containerRef;

  return instance._render();
}

/*
 * This class is kept for backward compatibility
 */
export default class BaseControl<
  Props: BaseControlProps,
  State: any,
  ContainerType: Element
> extends PureComponent<Props, State> {
  static propTypes = mapControlPropTypes;
  static defaultProps = mapControlDefaultProps;

  _context: any = {};
  _containerRef: {current: null | ContainerType} = createRef();

  _onScroll = (evt: MjolnirEvent) => {};

  _onDragStart = (evt: MjolnirEvent) => {};

  _onDblClick = (evt: MjolnirEvent) => {};

  _onClick = (evt: MjolnirEvent) => {};

  _onPointerMove = (evt: MjolnirEvent) => {};

  _render() {
    throw new Error('_render() not implemented');
  }

  render() {
    return (
      <Control
        instance={this}
        onScroll={this._onScroll}
        onDragStart={this._onDragStart}
        onDblClick={this._onDblClick}
        onClick={this._onClick}
        onPointerMove={this._onPointerMove}
      />
    );
  }
}
