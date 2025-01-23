import * as React from 'react';

const camelPattern = /(^|[A-Z])[a-z]*/g;
function formatSettingName(name) {
  return name.match(camelPattern).join(' ');
}

function Checkbox({name, value, onChange}) {
  return (
    <div className="input">
      <label>{formatSettingName(name)}</label>
      <input type="checkbox" checked={value} onChange={evt => onChange(name, evt.target.checked)} />
    </div>
  );
}

function NumericInput({name, value, onChange}) {
  return (
    <div className="input">
      <label>{formatSettingName(name)}</label>
      <input
        type="number"
        value={value}
        onChange={evt => onChange(name, Number(evt.target.value))}
      />
    </div>
  );
}

function ControlPanel(props) {
  const {settings, onChange} = props;

  const renderSetting = (name, value) => {
    switch (typeof value) {
      case 'boolean':
        return <Checkbox key={name} name={name} value={value} onChange={onChange} />;
      case 'number':
        return <NumericInput key={name} name={name} value={value} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="control-panel">
      <h3>Limit Map Interaction</h3>
      <p>Turn interactive features off/on.</p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/interaction"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
      <hr />

      {Object.keys(settings).map(name => renderSetting(name, settings[name]))}

      <hr />
    </div>
  );
}

export default React.memo(ControlPanel);
