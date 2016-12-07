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

// NOTE: Transform is not a public API so we should be careful to always lock
// down mapbox-gl to a specific major, minor, and patch version.
import Transform from './transform';
import {LngLatBounds, Point} from 'mapbox-gl';

/**
 * Returns map settings {latitude, longitude, zoom}
 * that will contain the provided corners within the provided
 * width.
 * @param {Number} width - viewport width
 * @param {Number} height - viewport height
 * @param {Array} bounds - [[lat,lon], [lat,lon]]
 * @param {Number} options.padding - viewport width
 * @returns {Object} - latitude, longitude and zoom
 */
export default function fitBounds(width, height, bounds, {
  padding = 0
} = {}) {
  const _bounds = new LngLatBounds([
    bounds[0].reverse(),
    bounds[1].reverse()
  ]);
  const offset = Point.convert([0, 0]);
  const tr = new Transform();
  tr.width = width;
  tr.height = height;
  const nw = tr.project(_bounds.getNorthWest());
  const se = tr.project(_bounds.getSouthEast());
  const size = se.sub(nw);
  const scaleX = (tr.width - padding * 2 - Math.abs(offset.x) * 2) / size.x;
  const scaleY = (tr.height - padding * 2 - Math.abs(offset.y) * 2) / size.y;

  const center = tr.unproject(nw.add(se).div(2));
  const zoom = tr.scaleZoom(tr.scale * Math.abs(Math.min(scaleX, scaleY)));
  return {
    latitude: center.lat,
    longitude: center.lng,
    zoom
  };
}
