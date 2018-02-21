const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    // game: './src/ChessGame.ts',
    // engine: './src/ChessEngine.ts',
    dev: './dev/index.ts',
    style: './src/scss/main.scss',
    gui: './GUI/src/index.tsx',
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dev/'),
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('precss'),
                require('autoprefixer'),
              ],
            },
          },
        ],
      },
    ],
  },
};
