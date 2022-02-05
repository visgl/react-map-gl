import * as React from 'react';
import {useCallback} from 'react';

export type Mode = 'side-by-side' | 'split-screen';

function ControlPanel(props: {mode: Mode; onModeChange: (newMode: Mode) => void}) {
  const onModeChange = useCallback(
    evt => {
      props.onModeChange(evt.target.value as Mode);
    },
    [props.onModeChange]
  );

  return (
    <div className="control-panel">
      <h3>Side by Side</h3>
      <p>Synchronize two maps.</p>

      <div>
        <label>Mode: </label>
        <select value={props.mode} onChange={onModeChange}>
          <option value="side-by-side">Side by side</option>
          <option value="split-screen">Split screen</option>
        </select>
      </div>

      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/side-by-side"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
