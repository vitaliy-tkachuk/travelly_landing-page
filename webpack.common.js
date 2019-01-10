// Base variables
//  const path = require('path');

// Importing plugins that do not come by default in webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // JS and scss entry points
    main: [
      './src/js/main.js', // Javascript entry point
      './src/scss/main.scss', // scss entry point
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // excluding js files in node_modules from transformation
        loader: 'babel-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../', // since img folder is outside css/scss folder,
              // we are going one folder up, so images (for example in background-image url()) could resolve correctly.
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader', // configuration in postcss.config.js
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href', ':data-src'],
            },
          },
        ],
      },
      {
        test: /\.(png|gif|jpe?g|ico)$/,
        exclude: /node_modules/, // excluding images in node_modules
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name].[ext]',
              limit: 6192,
              fallback: 'file-loader', // file-loader is default value
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '85-100',
                speed: 3,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 85,
              },
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        exclude: /fonts/ /* dont want svg fonts from fonts folder to be included */,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /img/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: '../', // fonts folder is outside scss/css folder, thats why we need to go one folder up.
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // uncomment to enable jQuery
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery',
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:4].css',
      chunkFilename: 'css/[id]-[contenthash:4].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(['dist']),
  ],
};
