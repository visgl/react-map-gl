import React, {PureComponent} from 'react';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Zoom to Bounding Box</h3>
        <p>Click on a San Fransisco Neighborhood to zoom in.</p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/3.2-release/examples/zoom-to-bounds" target="_new">View Code ↗</a>
        </div>
      </Container>
    );
  }
}
