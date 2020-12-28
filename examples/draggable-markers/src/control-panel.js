import * as React from 'react';

const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

function ControlPanel(props) {
  return (
    <div className="control-panel">
      <h3>Draggable Marker</h3>
      <p>Try dragging the marker to another location.</p>
      <div>
        {eventNames.map(eventName => {
          const {events = {}} = props;
          const lngLat = events[eventName];
          return (
            <div key={eventName}>
              <strong>{eventName}:</strong> {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
            </div>
          );
        })}
      </div>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/6.0-release/examples/draggable-markers"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
