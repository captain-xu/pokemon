const Koa = require('koa')
const fs = require('fs');
const Router = require('koa-router')
const mysql = require('promise-mysql')
const { historyApiFallback } = require('koa2-connect-history-api-fallback');

async function setup() {

  let app = new Koa()
  let router = new Router()

  app.use(historyApiFallback({ whiteList: ['/api', '/db', '/dist', '/static'] }));
  
  // 根路由
  if (process.env.BUILD_ENV === 'development') {
    const webpack = require('webpack')
    const compiler = webpack(require('../client/webpack.config'))
    const devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: '/',
      logLevel: 'silent',
      hot: true,
    });
    app.use(require('koa2-connect')(devMiddleware));

    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: false,
      heartbeat: 2000,
    });
    app.use(require('koa2-connect')(hotMiddleware));
  } else if (process.env.BUILD_ENV === 'production') {
    router.get('/', async ctx=>{
      ctx.response.type = 'html';
      ctx.response.body = fs.createReadStream('client/dist/index.html');
    })
  }
  
  // 测试mysql连接路由
  router.get('/db', async ctx=>{
    let db = await mysql.createPool({
      host: 'mysql',
      port: 3306,
      user: 'root',
      password: 'sa123456'
    })
    let res = await db.query('SHOW DATABASES')
    ctx.body = res
  })
  
  app.use(router.routes())
  app.listen(3000)
}

setup()
