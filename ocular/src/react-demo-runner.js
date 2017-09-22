import React, {Component} from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

const propTypes = {
  demo: PropTypes.object,
  canvas: PropTypes.string
};

const defaultProps = {
  canvas: 'demo-canvas'
};

export default class DemoRunner extends Component {

  componentDidMount() {
    this.props.demo.start({
      canvas: this.props.canvas,
      debug: true
    });
  }

  componentWillUnmount() {
    this.props.demo.stop();
  }

  render() {
    const {width, height} = this.props;
    return (
      <div className='fg' style={{width, height, padding: 0, border: 0}}>
        <canvas
          id={this.props.canvas}
          style={{width: '100%', height: '100%', padding: 0, border: 0}}/>
      </div>
    );
  }

}

DemoRunner.propTypes = propTypes;
DemoRunner.defaultProps = defaultProps;
