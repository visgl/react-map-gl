const {JSDOM} = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html><div id="map"></div>`);
/* global global */
global.document = dom.window.document;

require('./src');
