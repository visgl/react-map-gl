import * as React from 'react';
import {useState, useEffect} from 'react';

// Layer id patterns by category
const layerSelector = {
  parks: /park/,
  buildings: /building/,
  roads: /bridge|road|tunnel/,
  labels: /label|place|poi/
};

function getLayerFilter(categories, layerId) {
  for (const key in categories) {
    if (categories[key] && layerSelector[key].test(layerId)) {
      return true;
    }
  }
  return false;
}

function Checkbox({name, value, onChange}) {
  return (
    <div key={name} className="input">
      <label>{name}</label>
      <input type="checkbox" checked={value} onChange={evt => onChange(name, evt.target.checked)} />
    </div>
  );
}

function StyleControls(props) {
  const [categories, setCategories] = useState({
    parks: true,
    buildings: true,
    roads: true,
    labels: true
  });

  useEffect(() => {
    const filter = layerId => getLayerFilter(categories, layerId);
    props.onChange(filter);
  }, [categories]);

  const toggleLayer = (name, on) => {
    setCategories({...categories, [name]: on});
  };

  return (
    <div className="control-panel">
      <h3>Custom Cursor</h3>
      <p>Customize the cursor based on interactivity.</p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/6.1-release/examples/custom-cursor"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
      <hr />
      <p>Clickable layers</p>
      {Object.keys(layerSelector).map(name => (
        <Checkbox key={name} name={name} value={categories[name]} onChange={toggleLayer} />
      ))}
    </div>
  );
}

export default React.memo(StyleControls);
