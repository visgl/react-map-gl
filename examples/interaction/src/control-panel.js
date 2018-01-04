import React, {PureComponent} from 'react';

const camelPattern = /(^|[A-Z])[a-z]*/g;
const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {

  _formatSettingName(name) {
    return name.match(camelPattern).join(' ');
  }

  _renderCheckbox(name, value) {
    return (
      <div key={name} className="input">
        <label>{this._formatSettingName(name)}</label>
        <input type="checkbox" checked={value}
          onChange={evt => this.props.onChange(name, evt.target.checked)} />
      </div>
    );
  }

  _renderNumericInput(name, value) {
    return (
      <div key={name} className="input">
        <label>{this._formatSettingName(name)}</label>
        <input type="number" value={value}
          onChange={evt => this.props.onChange(name, Number(evt.target.value))} />
      </div>
    );
  }

  _renderSetting(name, value) {
    switch (typeof value) {
    case 'boolean':
      return this._renderCheckbox(name, value);
    case 'number':
      return this._renderNumericInput(name, value);
    default:
      return null;
    }
  }

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {settings} = this.props;

    return (
      <Container>
        <h3>Limit Map Interaction</h3>
        <p>Turn interactive features off/on.</p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/3.0-release/examples/interaction" target="_new">View Code ↗</a>
        </div>
        <hr />

        { Object.keys(settings).map(name => this._renderSetting(name, settings[name])) }
      </Container>
    );
  }
}
