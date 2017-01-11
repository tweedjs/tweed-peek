import { optimize } from 'webpack'

export default {
  entry: './src',
  output: {
    path: __dirname,
    filename: 'tweed-peek.min.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /node_modules/,
        test: /\.js$/
      },
      {
        loader: 'json',
        test: /\.json$/
      }
    ]
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new optimize.UglifyJsPlugin()
  ] : []
}
