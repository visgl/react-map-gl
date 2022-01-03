/* global document */
import * as React from 'react';
import {render} from 'react-dom';
import {MapProvider} from 'react-map-gl';

import Map from './map';
import Controls from './controls';

function Root() {
  return (
    <MapProvider>
      <Controls />
      <Map />
    </MapProvider>
  );
}

render(<Root />, document.body.appendChild(document.createElement('div')));
