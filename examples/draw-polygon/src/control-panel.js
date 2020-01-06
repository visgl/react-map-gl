import React, {PureComponent} from 'react';
import area from '@turf/area';
const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const polygon = this.props.polygon;
    const polygonArea = polygon && area(polygon);
    return (
      <Container>
        <h3>Draw Polygon</h3>
        {polygon && (
          <p>
            {polygonArea} <br />
            square meters
          </p>
        )}
        <a
          href="https://github.com/uber/react-map-gl/tree/5.2-release/examples/draw-polygon"
          target="_new"
        >
          View Code ↗
        </a>
      </Container>
    );
  }
}
