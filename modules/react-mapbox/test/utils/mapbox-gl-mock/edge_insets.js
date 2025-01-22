// Generated with
// flow-remove-types ./node_modules/mapbox-gl/src/geo/edge_insets.js

import Point from '@mapbox/point-geometry';
import {clamp, number} from './util.js';

class EdgeInsets {
  constructor(top = 0, bottom = 0, left = 0, right = 0) {
    if (
      isNaN(top) ||
      top < 0 ||
      isNaN(bottom) ||
      bottom < 0 ||
      isNaN(left) ||
      left < 0 ||
      isNaN(right) ||
      right < 0
    ) {
      throw new Error(
        'Invalid value for edge-insets, top, bottom, left and right must all be numbers'
      );
    }

    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }

  interpolate(start, target, t) {
    if (target.top != null && start.top != null) this.top = number(start.top, target.top, t);
    if (target.bottom != null && start.bottom != null)
      this.bottom = number(start.bottom, target.bottom, t);
    if (target.left != null && start.left != null) this.left = number(start.left, target.left, t);
    if (target.right != null && start.right != null)
      this.right = number(start.right, target.right, t);

    return this;
  }

  getCenter(width, height) {
    // Clamp insets so they never overflow width/height and always calculate a valid center
    const x = clamp((this.left + width - this.right) / 2, 0, width);
    const y = clamp((this.top + height - this.bottom) / 2, 0, height);

    return new Point(x, y);
  }

  equals(other) {
    return (
      this.top === other.top &&
      this.bottom === other.bottom &&
      this.left === other.left &&
      this.right === other.right
    );
  }

  clone() {
    return new EdgeInsets(this.top, this.bottom, this.left, this.right);
  }

  toJSON() {
    return {
      top: this.top,
      bottom: this.bottom,
      left: this.left,
      right: this.right
    };
  }
}

export default EdgeInsets;
