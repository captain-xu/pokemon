const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: [
    path.resolve(__dirname, './src/index'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: process.env.BUILD_ENV === 'production' ? '/dist/' : '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

process.env.BUILD_ENV === 'development' && config.entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true')

module.exports = config;