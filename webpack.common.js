const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');

module.exports = {
  entry: path.join(SRC, 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@api':        path.join(SRC, 'api'),
      '@app':        path.join(SRC, 'app'),
      '@components': path.join(SRC, 'components'),
      '@features':   path.join(SRC, 'features'),
      '@hooks':      path.join(SRC, 'hooks'),
      '@layout':     path.join(SRC, 'layout'),
      '@styles':     path.join(SRC, 'styles'),
      '@utils':      path.join(SRC, 'utils'),
      '@assets':     path.join(SRC, 'assets'),
      '@pages':      path.join(SRC, 'pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public/index.html') }),
    // Webpack 5 dropped the Node `process` polyfill. ProvidePlugin injects
    // the browser shim into every module that references `process`, which
    // covers both our code and any node_modules that use process.env.NODE_ENV.
    new webpack.ProvidePlugin({
      process: require.resolve('process/browser'),
    }),
    // Static replacement for our own process.env.* references at build time.
    new webpack.EnvironmentPlugin({
      REACT_APP_API_BASE_URL:    'http://localhost:4000',
      REACT_APP_REPORT_SUITE_ID: 'mock-report-suite',
    }),
  ],
};
