const register = require('@babel/register').default;

register({extensions: ['.ts', '.tsx', '.js']});

require('./src');
