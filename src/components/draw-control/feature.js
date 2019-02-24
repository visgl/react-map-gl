import {polygon, lineString, point} from '@turf/helpers';

export default class Feature {
  static fromFeature(feature) {
    const {geometry: {coordinates, type}, properties: {id, renderType, ...otherProps}} = feature;

    switch (type) {
    case 'Point':
      return new Feature({
        id,
        type,
        renderType: renderType || type,
        points: [coordinates],
        ...otherProps
      });

    case 'LineString':
      return new Feature({
        id,
        type,
        renderType: renderType || type,
        points: coordinates,
        ...otherProps
      });

    case 'Polygon':
      return new Feature({
        id,
        type,
        renderType: renderType || type,
        points: coordinates[0].slice(0, -1),
        isClosed: true,
        ...otherProps
      });

    default:
      return null;
    }
  }

  constructor({id, type, renderType, points = [], isClosed, ...otherProps}) {
    this.id = id;
    this.type = type;
    this.renderType = renderType;
    this.points = points;
    this.isClosed = isClosed;
    this.otherProps = otherProps;
  }

  addPoint(pt) {
    this.points.push(pt);
    return true;
  }

  removePoint(index) {
    const {points} = this;
    if (index >= 0 && index < points.length) {
      points.splice(index, 1);
      if (points.length < 3) {
        this.isClosed = false;
      }
      return true;
    }
    return false;
  }

  replacePoint(index, pt) {
    const {points} = this;
    if (index >= 0 && index < points.length) {
      points[index] = pt;
      return true;
    }
    return false;
  }

  insertPoint(index) {
    const {points} = this;
    const p = points[index];
    const prevP = points[index ? index - 1 : points.length - 1];
    if (p && prevP) {
      const newP = [(p.x + prevP.x) / 2, (p.y + prevP.y) / 2];
      points.splice(index, 0, newP);
      return true;
    }
    return false;
  }

  closePath() {
    const {points} = this;
    if (points.length >= 3) {
      this.isClosed = true;
      return true;
    }
    return false;
  }

  toFeature() {
    const {id, points, isClosed, renderType, otherProps} = this;
    let feature = null;
    if (points.length < 2) {
      feature = point(points[0], {
        id,
        renderType,
        ...otherProps
      });
    } else if (points < 3 || !isClosed) {
      feature = lineString(points, {
        id,
        renderType,
        ...otherProps
      });
    } else {
      feature = polygon([points.concat([points[0]])], {
        id,
        isClosed,
        renderType,
        ...otherProps
      });
    }

    return feature;
  }
}
