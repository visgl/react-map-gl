import React from 'react';

function Checkbox({name, value, onChange}) {
  return (
    <div key={name} className="input">
      <label>{name}</label>
      <input type="checkbox" checked={value} onChange={evt => onChange(name, evt.target.checked)} />
    </div>
  );
}

function ControlPanel({
  overLabels,
  setOverLabels
}: {
  overLabels: boolean;
  setOverLabels: (v: boolean) => void;
}) {
  return (
    <div className="control-panel">
      <h3>Deck.gl layer</h3>
      <p>A deck.gl overlay can be used and inserted inside the Mapbox layers.</p>
      <Checkbox
        name="Arcs over labels"
        value={overLabels}
        onChange={(name: string, v: boolean) => setOverLabels(v)}
      />
    </div>
  );
}

export default ControlPanel;
