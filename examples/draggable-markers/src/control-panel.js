import * as React from 'react';
import {PureComponent} from 'react';

const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

export default class ControlPanel extends PureComponent {
  renderEvent = eventName => {
    const {events = {}} = this.props;
    const lngLat = events[eventName];
    return (
      <div key={eventName}>
        <strong>{eventName}:</strong> {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
      </div>
    );
  };

  render() {
    return (
      <div className="control-panel">
        <h3>Draggable Marker</h3>
        <p>Try dragging the marker to another location.</p>
        <div>{eventNames.map(this.renderEvent)}</div>
        <div className="source-link">
          <a
            href="https://github.com/visgl/react-map-gl/tree/5.2-release/examples/draggable-markers"
            target="_new"
          >
            View Code ↗
          </a>
        </div>
      </div>
    );
  }
}
