import React, {PureComponent} from 'react';
import storesData from './data/stores.geojson';
import storesStyle from './data/style.json';

export default class Stores {
  render() {
    const {data, onClick} = this.props;
    return (
      <Source type="geojson" data={storesData}>
        <Layer {...storesStyle} id="stores" />
      </Source>
    );
  }
}
