import React, {PureComponent} from 'react';

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {settings} = this.props;

    return (
      <Container>
        <h3>Highlight Features Containing Similar Data</h3>
        <p>Hover over counties to highlight counties that share the same name.</p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/3.0-release/examples/filter" target="_new">View Code ↗</a>
        </div>
      </Container>
    );
  }
}
