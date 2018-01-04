import React, {PureComponent} from 'react';
import {fromJS} from 'immutable';
import MAP_STYLE from '../../map-style-basic-v8.json';

const defaultMapStyle = fromJS(MAP_STYLE);

const categories = ['labels', 'roads', 'buildings', 'parks', 'water', 'background'];

// Layer id patterns by category
const layerSelector = {
  background: /background/,
  water: /water/,
  parks: /park/,
  buildings: /building/,
  roads: /bridge|road|tunnel/,
  labels: /label|place|poi/
};

// Layer color class by type
const colorClass = {
  line: 'line-color',
  fill: 'fill-color',
  background: 'background-color',
  symbol: 'text-color'
};

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class StyleControls extends PureComponent {

  constructor(props) {
    super(props);

    this._defaultLayers = defaultMapStyle.get('layers');

    this.state = {
      visibility: {
        water: true,
        parks: true,
        buildings: true,
        roads: true,
        labels: true,
        background: true
      },
      color: {
        water: '#DBE2E6',
        parks: '#E6EAE9',
        buildings: '#c0c0c8',
        roads: '#ffffff',
        labels: '#78888a',
        background: '#EBF0F0'
      }
    };
  }

  componentDidMount() {
    this._updateMapStyle(this.state);
  }

  _onColorChange(name, event) {
    const color = {...this.state.color, [name]: event.target.value};
    this.setState({color});
    this._updateMapStyle({...this.state, color});
  }

  _onVisibilityChange(name, event) {
    const visibility = {...this.state.visibility, [name]: event.target.checked};
    this.setState({visibility});
    this._updateMapStyle({...this.state, visibility});
  }

  _updateMapStyle({visibility, color}) {

    const layers = this._defaultLayers
    .filter(layer => {
      const id = layer.get('id');
      return categories.every(name => visibility[name] || !layerSelector[name].test(id));
    })
    .map(layer => {
      const id = layer.get('id');
      const type = layer.get('type');
      const category = categories.find(name => layerSelector[name].test(id));
      if (category && colorClass[type]) {
        return layer.setIn(['paint', colorClass[type]], color[category]);
      }
      return layer;
    });

    this.props.onChange(defaultMapStyle.set('layers', layers));
  }

  _renderLayerControl(name) {
    const {visibility, color} = this.state;

    return (
      <div key={name} className="input">
        <label>{name}</label>
        <input type="checkbox" checked={visibility[name]}
          onChange={this._onVisibilityChange.bind(this, name)} />
        <input type="color" value={color[name]} disabled={!visibility[name]}
          onChange={this._onColorChange.bind(this, name)} />
      </div>
    );
  }

  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Dynamic Styling</h3>
        <p>Dynamically show/hide map layers and change color with Immutable map style.</p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/3.0-release/examples/layers" target="_new">
            View Code ↗
          </a>
        </div>
        <hr />
        { categories.map(name => this._renderLayerControl(name)) }
      </Container>
    );
  }
}
