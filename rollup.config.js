import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const globals = {
  react: 'React'
};

export default [
  {
    input: './src/index.js',
    output: {
      file: 'dist/react-map-gl.umd.js',
      format: 'umd',
      name: 'ReactMapGL',
      exports: 'named',
      globals
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel({ exclude: /node_modules/ }),
      // temporary fix until https://github.com/uber/react-map-gl/issues/557
      // is resolved
      {
        name: 'hoist-mapbox-gl-import',
        transform(code) {
          if (code.includes(`require('mapbox-gl')`)) {
            const importStatement = `import __MapBoxGL__ from 'mapbox-gl';\n`;
            const processedCode = code.replace(
              /require\('mapbox-gl'\)/g,
              '__MapBoxGL__'
            );
            return {
              code: importStatement + processedCode
            };
          }
        }
      },
      {
        name: 'hoist-hammerjs-import',
        transform(code) {
          if (code.includes(`require('hammerjs')`)) {
            const importStatement = `import __hammerjs__ from 'hammerjs';\n`;
            const processedCode = code.replace(
              /require\('hammerjs'\)/g,
              '__hammerjs__'
            );
            return {
              code: importStatement + processedCode
            };
          }
        }
      },
      commonjs(),
      sizeSnapshot()
    ]
  }
];
