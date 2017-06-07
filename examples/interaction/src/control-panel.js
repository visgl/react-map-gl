import React, {PureComponent} from 'react';

const camelPattern = /(^|[A-Z])[a-z]*/g;

export default class ControlPanel extends PureComponent {

  _formatSettingName(name) {
    return name.match(camelPattern).join(' ');
  }

  _renderCheckbox(name, value) {
    return (
      <div key={name}>
        <label>{this._formatSettingName(name)}</label>
        <input type="checkbox" checked={value}
          onChange={evt => this.props.onChange(name, evt.target.checked)} />
      </div>
    );
  }

  _renderNumericInput(name, value) {
    return (
      <div key={name}>
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
    const {settings} = this.props;

    return (
      <div className="control-panel">
        { Object.keys(settings).map(name => this._renderSetting(name, settings[name])) }
      </div>
    );
  }
}
