import * as React from 'react';
import {PureComponent} from 'react';

const camelPattern = /(^|[A-Z])[a-z]*/g;

export default class ControlPanel extends PureComponent {
  _formatSettingName(name) {
    return name.match(camelPattern).join(' ');
  }

  _renderCheckbox(name, value) {
    return (
      <div key={name} className="input">
        <label>{this._formatSettingName(name)}</label>
        <input
          type="checkbox"
          checked={value}
          onChange={evt => this.props.onChange(name, evt.target.checked)}
        />
      </div>
    );
  }

  render() {
    const {settings} = this.props;

    return (
      <div className="control-panel">
        <h3>Custom Controller</h3>
        <p>Override default event handling logic.</p>
        <div className="source-link">
          <a
            href="https://github.com/visgl/react-map-gl/tree/5.2-release/examples/custom-controller"
            target="_new"
          >
            View Code ↗
          </a>
        </div>
        <hr />

        {this._renderCheckbox('invertZoom', settings.invertZoom)}
        {this._renderCheckbox('invertPan', settings.invertPan)}
        {this._renderCheckbox('longPress', settings.longPress)}
      </div>
    );
  }
}
