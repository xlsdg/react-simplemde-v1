var path = require('path')
var webpack = require('webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: {
    'react-simplemde': ['./src/index.js']
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: undefined,
    libraryTarget: 'umd'
    // umdNamedDefine: true
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types'
    },
    simplemde: {
      root: 'SimpleMDE',
      commonjs2: 'simplemde',
      commonjs: 'simplemde',
      amd: 'simplemde',
    }
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // })
  ],
  performance: {
    hints: false
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
};
