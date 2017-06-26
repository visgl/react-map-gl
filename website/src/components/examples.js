/* global window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Examples extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth - 240,
        height: window.innerHeight
      }
    };
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({
        viewport: {
          width: window.innerWidth - 240,
          height: window.innerHeight
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
        <ExampleComponent {...viewport} />
      </div>
    );
  }

}

Examples.contextTypes = {
  router: PropTypes.object
};
