const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = require('./webpack.base.js')

const serverConf = {
  target: 'node',
  // mode: 'development',
  entry: {
    server: './src/server/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // "useBuiltIns": true,
                // useBuiltIns: "usage",
                "targets": {
                  // "browsers": ["IE >= 9.0"],
                  "node": "current"  // node支持的不转码
                },
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
            "dynamic-import-node",
            "@loadable/babel-plugin",
            // "@babel/plugin-transform-async-to-generator"
            [
              "@babel/plugin-transform-runtime",
              // {
              //   "corejs": false,
              //   "helpers": true,
              //   "regenerator": true,
              //   "useESModules": false
              // }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ "./build" ]),
    new webpack.DefinePlugin({
      SERVER: JSON.stringify(true),
      CLIENT: JSON.stringify(false)
    })
  ],
  externals: [nodeExternals()],
  node: {
    __dirname: false
  }
}

module.exports = merge(config, serverConf)
// module.exports = serverConf