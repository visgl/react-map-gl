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

/* global document */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TOC from './constants/toc';
import TableOfContents from './table-of-contents';
import ExampleContainer from './example-container';

import './stylesheets/main.scss';

const DEFAULT_ACTIVE_ID = TOC[0].children[0].path;
const DEFAULT_ACTIVE_COMPONENT = TOC[0].children[0].component;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeExampleId: DEFAULT_ACTIVE_ID,
      exampleComponent: DEFAULT_ACTIVE_COMPONENT
    };
  }

  _onTocChange(activeExampleId, exampleComponent) {
    this.setState({activeExampleId, exampleComponent});
  }

  render() {
    const {activeExampleId, exampleComponent} = this.state;
    return (
      <div className="gallery-wrapper flexbox--row" style={{paddingTop: 0}}>
        <div className="flexbox-item">
          <TableOfContents onChange={this._onTocChange.bind(this)} activeId={activeExampleId} />
        </div>
        <ExampleContainer component={exampleComponent} />
      </div>
    );
  }
}

App.defaultProps = {
  disablePadding: true
};

ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')));
