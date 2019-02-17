const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// console.log(config)
var config = require('./webpack.base')

const clientConf = {
  // mode: 'development',
  entry: {
    client: './src/client/index'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // { loader: 'style-loader' },
          { 
            loader: MiniCssExtractPlugin.loader,
            options: {

            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                "targets": {
                  // "browsers": [
                  //   "IE >= 9.0"
                  // ]
                }
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
            "@babel/plugin-syntax-dynamic-import",
            "@loadable/babel-plugin",
            // "@babel/plugin-transform-async-to-generator",
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
    // new HtmlWebpackPlugin({
    //   template: 'index.html'
    // }),
    new CleanWebpackPlugin([ "./public" ]),
    new webpack.DefinePlugin({
      CLIENT: JSON.stringify(true),
      SERVER: JSON.stringify(false)
    })
  ]
};

module.exports = merge(config, clientConf);
// module.exports = clientConf