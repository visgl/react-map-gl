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

import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import window from 'global/window';
import document from 'global/document';

import NotInteractiveExample from './views/not-interactive-example';
import CustomOverlayExample from './views/custom-overlay-example';
import GeodataCreator from './views/geodata-creator-example';
import ScatterplotOverlayExample from './views/scatterplot-overlay-example';
import RouteOverlayExample from './views/route-overlay-example';
import StyleDiffingExample from './views/style-diffing-example';
import TiltExample from './views/tilt-example';
import ClickExample from './views/click-example';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {width: window.innerWidth};
    window.addEventListener('resize', () => this.setState({width: window.innerWidth}));
  }

  render() {
    const common = {width: 400, height: 400, style: {float: 'left'}};
    return (
      <div>
        <TiltExample {...common} width={ this.state.width - 30 }/>
        <RouteOverlayExample {...common}/>
        <ScatterplotOverlayExample {...common}/>
        <CustomOverlayExample {...common}/>
        <GeodataCreator {...common}/>
        <NotInteractiveExample {...common}/>
        <StyleDiffingExample {...common}/>
        <ClickExample {...common }/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.body.appendChild(document.createElement('div')));
