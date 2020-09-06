var webpack = require('webpack');

module.exports = {

  mode: 'production',

  entry: {
    castinstance: './src/Page/CastInstance/Script.ts',
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name]/bundle.js'
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: "ts-loader" }
        ]
      }
    ]
  },

  performance: {
    hints: false
  },
};
