import * as React from 'react';

const camelPattern = /(^|[A-Z])[a-z]*/g;

function formatSettingName(name) {
  return name.match(camelPattern).join(' ');
}

function Checkbox({name, value, onChange}) {
  return (
    <div key={name} className="input">
      <label>{formatSettingName(name)}</label>
      <input type="checkbox" checked={value} onChange={evt => onChange(name, evt.target.checked)} />
    </div>
  );
}

function ControlPanel(props) {
  const {settings, onChange} = props;

  return (
    <div className="control-panel">
      <h3>Custom Controller</h3>
      <p>Override default event handling logic.</p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/6.0-release/examples/custom-controller"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
      <hr />

      <Checkbox name="invertZoom" value={settings.invertZoom} onChange={onChange} />
      <Checkbox name="invertPan" value={settings.invertPan} onChange={onChange} />
      <Checkbox name="longPress" value={settings.longPress} onChange={onChange} />
    </div>
  );
}

export default React.memo(ControlPanel);
