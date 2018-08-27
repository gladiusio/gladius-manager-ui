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
  MOCK_DATA: process.env.MOCK_DATA === "true",
  SENTRY_DSN: process.env.NODE_ENV === "production" ?
    "https://04f9d0921e1d4ad0bd92d8237275daf7@sentry.io/1269560" :
    "",
  CONTROL_API: 'http://localhost:3001/api',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader"
      },
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
