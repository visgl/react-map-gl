import React, {PureComponent} from 'react';

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Animated GeoJSON</h3>
        <p>Render animation by updating GeoJSON data source.</p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/3.0-release/examples/geojson-animation"
            target="_new">
            View Code ↗
          </a>
        </div>
      </Container>
    );
  }
}
