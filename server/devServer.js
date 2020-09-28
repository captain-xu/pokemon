const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = function useDevServer() {
  const compiler = webpack(require('../client/webpack.config'));
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: '/',
    host: '0.0.0.0',
    progress: true,
    stats: 'minimal'
  });
  const hotMiddleware = webpackHotMiddleware(compiler);
  return [devMiddleware, hotMiddleware, (req, res, next) => {
    res.devMiddleware = devMiddleware;
    next();
  }];
};
