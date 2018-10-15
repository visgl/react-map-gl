/* global window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfoPanel from './info-panel';

const WIDTH_OFFSET = 240;
const HEIGHT_OFFSET = 64;

export default class Examples extends Component {

  render() {
    const {route: {childComponent}} = this.props;
    const ExampleComponent = childComponent;
    return (
      <div className="flexbox-item flexbox-item--fill">
        <ExampleComponent containerComponent={InfoPanel} />
      </div>
    );
  }

}

Examples.contextTypes = {
  router: PropTypes.object
};
