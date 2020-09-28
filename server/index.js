const express = require('express');
const mysql = require('promise-mysql')
const useDevServer = require('./devServer');
const history = require('connect-history-api-fallback');
const ecstatic = require('ecstatic');

async function setup() {

  const app = express();
  app.use(history({
    rewrites: [
      {
        from: /^\/(now|db)$/,
        to: function(context) {
          return context.parsedUrl.pathname;
        }
      }
    ]
  }));
  
  // 根路由
  if (process.env.BUILD_ENV === 'development') {
    app.use(useDevServer());
  } else if (process.env.BUILD_ENV === 'production') {
    app.use(ecstatic({ root: 'client/dist/' }));
  }
  
  // 测试mysql连接路由
  app.get('/now', async (req, res)=>{
    res.send({
      code: 0,
      message: 'ok',
      response: {
        now: new Date().toISOString(),
      },
    });
  })
  
  // 测试mysql连接路由
  app.get('/db', async (req, res)=>{
    let db = await mysql.createPool({
      host: 'mysql',
      port: 3306,
      user: 'root',
      password: 'sa123456'
    })
    let dbRes = await db.query('SHOW DATABASES')
    res.send({
      code: 0,
      message: 'ok',
      response: {
        db: dbRes,
      },
    })
  })

  app.listen(3000)
}

setup()
