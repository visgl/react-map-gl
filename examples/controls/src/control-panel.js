import React, {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {
    return (
      <div className="options-panel" tabIndex="0">
        <h3>Marker, Popup, and NavigationControl</h3>
        <p>Map showing top 20 most populated cities of the United States. Click on a marker to learn more.</p>
        <p>Data source: <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population">Wikipedia</a></p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/master/examples/controls" target="_new">View Code ↗</a>
        </div>
      </div>
    );
  }
}
