import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';

import MercatorInteractions from './mercator-interactions';
import Map from './map';

@pureRender
export default class MapGL extends Component {

  static supported() {
    return Map.supported();
  }

  constructor(props) {
    super(props);
    this.state = {viewport: {}};
  }

  render() {
    return (
      <MercatorInteractions {...this.props}>
        <Map {...this.props}/>
      </MercatorInteractions>
    );
  }
}
