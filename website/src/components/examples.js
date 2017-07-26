/* global window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfoPanel from './info-panel';

const WIDTH_OFFSET = 240;
const HEIGHT_OFFSET = 64;

export default class Examples extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: this._getSize()
    };
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({
        viewport: this._getSize()
      });
    };
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  _getSize() {
    const {innerWidth, innerHeight} = window;

    return {
      width: innerWidth >= 576 ? innerWidth - WIDTH_OFFSET : innerWidth,
      height: innerHeight - HEIGHT_OFFSET
    };
  }

  render() {
    const {viewport} = this.state;
    const {route: {childComponent}} = this.props;
    const ExampleComponent = childComponent;
    return (
      <div className="flexbox-item flexbox-item--fill">
        <ExampleComponent containerComponent={InfoPanel}
          {...viewport} />
      </div>
    );
  }

}

Examples.contextTypes = {
  router: PropTypes.object
};
