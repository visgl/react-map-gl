import React, {PureComponent} from 'react';

const camelPattern = /(^|[A-Z])[a-z]*/g;
const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

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

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {settings} = this.props;

    return (
      <Container>
        <h3>Custom Controller</h3>
        <p>Override default event handling logic.</p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/4.0-release/examples/custom-controller" target="_new">
            View Code ↗
          </a>
        </div>
        <hr />

        {this._renderCheckbox('invertZoom', settings.invertZoom)}
        {this._renderCheckbox('invertPan', settings.invertPan)}
        {this._renderCheckbox('longPress', settings.longPress)}
      </Container>
    );
  }
}
