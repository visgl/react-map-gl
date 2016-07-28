// NOTE: Transform is not a public API so we should be careful to always lock
// down mapbox-gl to a specific major, minor, and patch version.
import Transform from 'mapbox-gl/js/geo/transform';
import {LngLatBounds, Point} from 'mapbox-gl';

export default function fitBounds(width, height, _bounds, options) {
  const bounds = new LngLatBounds([_bounds[0].reverse(), _bounds[1].reverse()]);
  options = options || {};
  const padding = typeof options.padding === 'undefined' ? 0 : options.padding;
  const offset = Point.convert([0, 0]);
  const tr = new Transform();
  tr.width = width;
  tr.height = height;
  const nw = tr.project(bounds.getNorthWest());
  const se = tr.project(bounds.getSouthEast());
  const size = se.sub(nw);
  const scaleX = (tr.width - padding * 2 - Math.abs(offset.x) * 2) / size.x;
  const scaleY = (tr.height - padding * 2 - Math.abs(offset.y) * 2) / size.y;

  const center = tr.unproject(nw.add(se).div(2));
  const zoom = tr.scaleZoom(tr.scale * Math.min(scaleX, scaleY));
  return {
    latitude: center.lat,
    longitude: center.lng,
    zoom
  };
}
