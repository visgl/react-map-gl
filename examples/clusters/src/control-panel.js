import React, {PureComponent} from 'react';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Create and Style Clusters</h3>
        <p>Use Mapbox GL JS' built-in functions to visualize points as clusters.</p>
        <div className="source-link">
          <a
            href="https://github.com/uber/react-map-gl/tree/5.0-release/examples/clusters"
            target="_new"
          >
            View Code ↗
          </a>
        </div>
      </Container>
    );
  }
}
