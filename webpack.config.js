const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry : "./sketch/sketch.ts",
  mode: dev ? 'development' : 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      /*{
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }*/
      {
        "test": "/\\.js$/",
        "use": ["source-map-loader"],
        "enforce": "pre"
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  }
  
};