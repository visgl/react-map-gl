/* global document */
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './store';

import Map from './map';
import Controls from './controls';

function Root() {
  return (
    <Provider store={store}>
      <Controls />
      <Map />
    </Provider>
  );
}

const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(<Root />);
