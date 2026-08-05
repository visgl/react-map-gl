/** @typedef {import('@vis.gl/dev-tools').OcularConfig} OcularConfig */
/** @type {OcularConfig} */
export default {
  lint: {
    paths: ['modules', 'test', 'examples']
  },

  entry: {
    size: [
      'test/size/mapbox-legacy.js',
      'test/size/maplibre.js',
      'test/size/mapbox.js'
    ]
  }
};
