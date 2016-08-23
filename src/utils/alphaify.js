import {rgb} from 'd3-color';

export default function alphaify(color, a) {
  const c = rgb(color);
  return `rgba(${[c.r, c.g, c.b]}, ${a})`;
}
