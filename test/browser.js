/* global window */
import test from 'tape';

test.onFinish(window.browserTestDriver_finish);
test.onFailure(window.browserTestDriver_fail);

import '../modules/main/test/components';
import '../modules/main/test/utils';
import '../modules/react-mapbox/test/components';
import '../modules/react-mapbox/test/utils';
import '../modules/react-maplibre/test/components';
import '../modules/react-maplibre/test/utils';
// import './render';
