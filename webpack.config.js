const koutoSwiss        = require('kouto-swiss')
const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/scripts/main.bundle.js'),
  },

  output: {
    path: path.resolve(__dirname + '/public'),
    filename: '[name].bundle.js'
  },

  devServer: {
    contentBase: path.join(__dirname, '/public'),
    compress: true,
    port: 9000
  },

  resolve: {
    alias: {
      '@styles': path.join(__dirname, 'src/styles'),
    },

    modules: [
      path.join(__dirname, '/src/scripts'),
      'node_modules'
    ]
  },

  module: {
    noParse: /libs\//,

    rules: [
      {
        test: /libs\/.+\.js$/,
        exclude: /node_modules/,
        use: "imports-loader?this=>window,define=>false,require=>false,module=>false,exports=>false"
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: { loader: 'style-loader' },
          use: [
            {
              loader: 'raw-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'stylus-loader',
              options: {
                use: [koutoSwiss()]
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].bundle.css'),

    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'),
      },
    })
  ]
};
