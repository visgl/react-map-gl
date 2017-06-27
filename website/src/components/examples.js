/* global window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const WIDTH_OFFSET = 240;
const HEIGHT_OFFSET = 64;

export default class Examples extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth - WIDTH_OFFSET,
        height: window.innerHeight - HEIGHT_OFFSET
      }
    };
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({
        viewport: {
          width: window.innerWidth - WIDTH_OFFSET,
          height: window.innerHeight - HEIGHT_OFFSET
        }
      });
    };
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  render() {
    const {viewport} = this.state;
    const {route: {childComponent}} = this.props;
    const ExampleComponent = childComponent;
    return (
      <div className="flexbox-item flexbox-item--fill">
        <ExampleComponent
          widthOffset={WIDTH_OFFSET}
          heightOffset={HEIGHT_OFFSET}
          {...viewport} />
      </div>
    );
  }

}

Examples.contextTypes = {
  router: PropTypes.object
};
