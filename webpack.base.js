const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: [' ', '.js', '.json'],
    alias: {
      '@components': path.resolve(__dirname, './src/components')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new LoadablePlugin()
  ]
}