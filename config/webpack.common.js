var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  context: helpers.root('src'),
  entry: {
    // 'style': [
    //   helpers.root('node_modules/bootstrap/dist/css/', 'bootstrap.min.css')
    // ],
    'polyfills': './polyfills.js',
    'vendor': './vendor.js',
    'app': ['./app/index.js']
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-decorators-legacy'
          ],
          presets: [
            ['es2015', { 'modules': false }],
            // webpack understands the native import syntax, and uses it for tree shaking

            'stage-0',
            // Specifies what level of language features to activate.
            // Stage 1 is proposal, Stage 2 is "draft", 4 is finished, 0 is strawman.
            // See https://tc39.github.io/process-document/

            'stage-1',
            // Specifies what level of language features to activate.
            // Stage 1 is proposal, Stage 2 is "draft", 4 is finished, 0 is strawman.
            // See https://tc39.github.io/process-document/

            'react'
            // Transpile React components to JavaScript
          ]
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.p?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // modules: true,
              // importLoaders: 1
            }
          }]
          // include: [
          //   helpers.root('node_modules/bootstrap/dist/css/', 'bootstrap.min.css')
          // ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file-loader?name=assets/images/[name].bundle.[ext]',
        // options: {
        //   name: 'assets/images/[name].bundle.[ext]'
        // }
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader?name=assets/fonts/[name].bundle.[ext]',
        // options: {
        //   name: 'assets/fonts/[name].bundle.[ext]'
        // }
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'polyfills'] // style
    }),

    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'React Blog - homework2'
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
