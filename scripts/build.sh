#!/bin/sh
export PATH=$PATH:node_modules/.bin

BABEL_ENV=es6 babel src --out-dir dist/es6 --source-maps --ignore 'node_modules/' &&
BABEL_ENV=esm babel src --out-dir dist/esm --source-maps --ignore 'node_modules/' &&
BABEL_ENV=es5 babel src --out-dir dist/es5 --source-maps --ignore 'node_modules/'