const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    game: './src/ChessGame.ts',
    engine: './src/ChessEngine.ts',
    dev: './dev/index.ts',
  },
  target: "node",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './built/dist/')
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: 'awesome-typescript-loader'
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};
