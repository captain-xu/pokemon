/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const BUILD_ENV = process.env.BUILD_ENV;
const isDev = BUILD_ENV === 'development';

const cssRegex        = /\.css$/;
const lessRegex       = /\.less$/;

function getStyleLoaders(cssOptions = {}, preProcessor) {
  const loaders = [
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: isDev,
        ...cssOptions
      },
    },
  ];

  if (!isDev) {
    loaders.unshift({loader: MiniCssExtractPlugin.loader,});
  } else {
    loaders.unshift(require.resolve('style-loader'));
  }

  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: isDev,
        ...(preProcessor === 'less-loader' ? {lessOptions: {javascriptEnabled: true}} : {})
      }
    });
  }
  return loaders;
}

const config = {
  mode: process.env.BUILD_ENV,
  entry: [
    path.resolve(__dirname, './src/index'),
  ],
  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
    publicPath: isDev ? '/' : '/dist/'
  },

  module: {
    // 加载器配置
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: cssRegex,
        use: getStyleLoaders({
          importLoaders: 1,
        }),
      },
      {
        test: lessRegex,
        use: getStyleLoaders({
          importLoaders: 2,
        }, "less-loader"),
      },
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts'
    ],
    plugins: [new TsconfigPathsPlugin({})]
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      appMountId: 'app',
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    !isDev && new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:6].css',
      chunkFilename: 'styles/[name].[chunkhash:6].css'
    }),
    isDev && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean)
};

isDev && config.entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true')

module.exports = config;
