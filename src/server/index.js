// require("@babel/register")({
//   // plugins: ['@babel/plugin-transform-modules-commonjs']
// })

require('./app.js')
require('es6-promise').polyfill();
require('isomorphic-fetch');
