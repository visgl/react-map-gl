import React, {PureComponent} from 'react';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Clicable Markers Rendered in a GeoJSON Layer</h3>
        <p>Map showing over 1800 Target stores in the US. Click on a marker to learn more.</p>
        <p>
          Data source: <a href="https://www.kaggle.com/ben1989/target-store-dataset">Kaggle</a>
        </p>
        <div className="source-link">
          <a
            href="https://github.com/uber/react-map-gl/tree/5.2-release/examples/geojson-markers"
            target="_new"
          >
            View Code ↗
          </a>
        </div>
      </Container>
    );
  }
}
