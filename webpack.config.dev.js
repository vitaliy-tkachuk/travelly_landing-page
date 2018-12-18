const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge'); // webpack-merge is used to merge common settings with development specific ones.
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const common = require('./webpack.common.js'); // Importing common webpack config

module.exports = merge(common, {
  // Path for bundled files
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'js/[name]-[hash:4].js', // hash is used instead of contenthash for HMR compatibility
    filename: 'js/[name]-[hash:4].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8081,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3001/ during development
        host: 'localhost',
        port: 3001,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3101/)
        // through BrowserSync
        proxy: 'http://localhost:8081/',
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      }
    ),
  ],
});
