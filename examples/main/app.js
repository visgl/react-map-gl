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

/* global window */
import React, {Component} from 'react';

import MainExample from './views/main';
import NotInteractiveExample from './views/not-interactive';
import CustomOverlayExample from './views/custom-overlay';
import RouteOverlayExample from './views/route-overlay';
import StyleDiffingExample from './views/style-diffing';
import ClickExample from './views/click';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      showAllExamples: false
    };
    window.addEventListener('resize', () => this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    }));
  }

  render() {
    const {showAllExamples, width} = this.state;
    const common = {
      width: Math.floor(width / 2) - 10,
      height: 400,
      style: {float: 'left'}
    };
    const customExample = {
      ...common,
      width: this.state.width
    };
    return (
      <div>
        <MainExample {...customExample} />
        {!showAllExamples &&
          <button onClick={() => {
            this.setState({showAllExamples: true});
          }}>
            Show All Examples
          </button>}
        {showAllExamples &&
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <RouteOverlayExample {...common} />
            <CustomOverlayExample {...common}/>
            <NotInteractiveExample {...common}/>
            <StyleDiffingExample {...common}/>
            <ClickExample {...common }/>
          </div>}
      </div>
    );
  }

}
