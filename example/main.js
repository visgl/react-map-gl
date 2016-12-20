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

import document from 'global/document';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import autobind from 'autobind-decorator';
import window from 'global/window';

import NotInteractiveExample from './examples/not-interactive.react';
import ChoroplethExample from './examples/choropleth.react';
import CustomExample from './examples/custom.react';
import GeodataCreator from './examples/geodata-creator.react';
import ScatterplotExample from './examples/scatterplot.react';
import RouteExample from './examples/route.react';
import StyleDiffingExample from './examples/style-diffing.react';
import TiltExample from './examples/tilt.react';
import ClickExample from './examples/click.react';

function getAccessToken() {
  const match = window.location.search.match(/access_token=([^&\/]*)/);
  let accessToken = match && match[1];
  if (!accessToken) {
    /* eslint-disable no-process-env */
    /* global process */
    accessToken = process.env.MapboxAccessToken;
    /* eslint-enable no-process-env */
  }
  if (accessToken) {
    window.localStorage.accessToken = accessToken;
  } else {
    accessToken = window.localStorage.accessToken;
  }
  return accessToken;
}

export default class App extends Component {

  constructor(props) {
    super(props);
    window.addEventListener('resize', this._onWindowResize);
    this.state = {width: window.innerWidth};
  }

  @autobind _onWindowResize() {
    this.setState({width: window.innerWidth});
  }

  render() {
    const common = {
      width: 400,
      height: 400,
      style: {float: 'left'},
      mapboxApiAccessToken: getAccessToken()
    };
    return (
      <div>
        <TiltExample
          width={ this.state.width - 30 }
          height={ 400 }
          mapboxApiAccessToken={ getAccessToken() }/>
        <RouteExample { ...common }/>
        <ScatterplotExample { ...common }/>
        <ChoroplethExample { ...common }/>
        <CustomExample { ...common }/>
        <GeodataCreator { ...common }/>
        <NotInteractiveExample { ...common }/>
        <StyleDiffingExample { ...common }/>
        <ClickExample {...common }/>
        <StyleDiffingExample { ...common }/>
      </div>
    );
  }
}

const reactContainer = document.createElement('div');
document.body.appendChild(reactContainer);
ReactDOM.render(<App/>, reactContainer);
