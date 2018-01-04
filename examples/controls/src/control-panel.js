import React, {PureComponent} from 'react';

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Marker, Popup, and NavigationControl</h3>
        <p>Map showing top 20 most populated cities of the United States. Click on a marker to learn more.</p>
        <p>Data source: <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population">Wikipedia</a></p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/3.0-release/examples/controls" target="_new">View Code ↗</a>
        </div>
      </Container>
    );
  }
}
