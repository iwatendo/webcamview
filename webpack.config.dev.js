module.exports = {

  mode: 'development',  

  entry: {
    webcameraviewer: './src/Page/CastInstance/Script.ts',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]/bundle.js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'ts-loader', }
        ]
      }
    ]
  },
  performance: {
    hints: false
  }
};
