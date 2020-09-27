const Koa = require('koa')
const fs = require('fs');
const Router = require('koa-router')
const mysql = require('promise-mysql')

async function setup() {

  let app = new Koa()
  let router = new Router()
  
  // 根路由
  if (process.env.BUILD_ENV === 'development') {
    const webpack = require('webpack')
    const koaWebpack = require('koa-webpack');
    const compiler = webpack(require('../client/webpack.config'))
    const middleware = await koaWebpack({
      compiler,
      hotClient: {
        host: {
          client: '*',
          server: '0.0.0.0',
        },
        port: 34567
      },
    });
    app.use(middleware)
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
