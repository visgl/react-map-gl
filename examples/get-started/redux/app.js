/* global document */
import * as React from 'react';
import {render} from 'react-dom';
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

render(<Root />, document.body.appendChild(document.createElement('div')));
