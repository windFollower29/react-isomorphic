// require("@babel/register")({
//   // plugins: ['@babel/plugin-transform-modules-commonjs']
// })

require('./app.js')

// import app from './app.js'

// const config = require('../../webpack.server')

// const compiler = webpack(config)

// compiler.run((err, stats) => {
//   // 在这里打印 watch/build 结果...
//   // console.log(stats);
// console.log('----start----')
//   require('./app.js')

// });

// compiler.watch({
//   // watchOptions 示例
//   aggregateTimeout: 300,
//   poll: undefined
// }, (err, stats) => {
//   // 在这里打印 watch/build 结果...
//   console.log(stats);

//   require('./app.js')

// });