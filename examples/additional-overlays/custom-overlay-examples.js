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
import React, {Component} from 'react';
import Immutable from 'immutable';

import ScatterplotOverlay from './scatterplot-overlay';
import ChoroplethOverlay from './choropleth-overlay';

// San Francisco
import ZIPCODES_SF from './data/feature-example-sf.json';
import CITIES from './data/cities.json';

const ZIPCODES = Immutable.fromJS(ZIPCODES_SF.features)
  .map(f => f.setIn(['properties', 'value'], Math.random() * 1000));

const CITY_LOCATIONS = Immutable.fromJS(
  CITIES.map(c => [c.longitude, c.latitude])
);

export default [
  (<ChoroplethOverlay key="choropleth"
    globalOpacity={ 0.8 }
    colorDomain={ [0, 500, 1000] }
    colorRange={ ['#31a354', '#addd8e', '#f7fcb9'] }
    renderWhileDragging={ false }
    features={ ZIPCODES } />),
  (<ScatterplotOverlay key="scatterplot"
    locations={CITY_LOCATIONS}
    dotRadius={10}
    globalOpacity={0.8}
    compositeOperation="lighter"
    dotFill="#00a8fe"
    renderWhileDragging={true} />)
];
