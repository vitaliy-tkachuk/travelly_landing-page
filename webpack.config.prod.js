const path = require('path');

// Importing plugins that do not come by default in webpack
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const merge = require('webpack-merge'); // webpack-merge is used to merge common settings with production specific ones.
const common = require('./webpack.common.js'); // Importing common webpack config

module.exports = merge(common, {
  devtool: 'source-map',
  // Path for bundled files
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[name]-[contenthash:4].js',
    filename: 'js/[name]-[contenthash:4].js',
  },
  // optimization configuration
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true, // Use multi-process parallel running to improve the build speed.
        sourceMap: true, // Set to true if you want JS source maps
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
});
