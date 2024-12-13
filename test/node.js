import {JSDOM} from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><div id="map"></div>`);
/* global global */
global.document = dom.window.document;

import './src';
