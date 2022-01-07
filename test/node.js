const register = require('@babel/register').default;
const path = require('path');
const {JSDOM} = require('jsdom');

const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  'mapbox-gl': path.resolve(__dirname, './src/utils/mapbox-gl-mock')
});

register({extensions: ['.ts', '.tsx', '.js']});

const dom = new JSDOM(`<!DOCTYPE html><div id="map"></div>`);
/* global global */
global.document = dom.window.document;

require('./src');
