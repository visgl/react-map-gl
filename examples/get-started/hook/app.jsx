/* global document */
import * as React from 'react';
import {createRoot} from 'react-dom/client';
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

const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(<Root />);
