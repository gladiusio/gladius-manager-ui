const path = require('path');
const SVGO = require('svgo');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const svgo = new SVGO();
const htmlConfig = new HtmlPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

const copyConfig = new CopyPlugin([{
  context: 'src/assets',
  from: '**/*.!(svg)',
  to: 'assets',
}]);

const svgCopyConfig = new CopyPlugin([{
  context: 'src/assets',
  from: '**/*.svg',
  to: 'assets',
  // eslint-disable-next-line no-shadow
  transform: async (content, path) => {
    const { data } = await svgo.optimize(content, { path });
    return data;
  },
}]);

const env = new webpack.EnvironmentPlugin({
  NODE_ENV: '',
  DNS_API: 'https://dns-api.org',
  MARKET_CONTRACT_ADDRESS: '0xaa588d3737b611bafd7bd713445b314bd453a5c8',
  POOL_CONTRACT_ADDRESS: '0xf204a4ef082f5c04bb89f7d5e6568b796096735a',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },

  plugins: [
    htmlConfig,
    svgCopyConfig,
    copyConfig,
    env,
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
  },

  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new UglifyPlugin());
}
