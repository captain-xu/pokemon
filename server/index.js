const express = require('express');
const useDevServer = require('./devServer');
const history = require('connect-history-api-fallback');
const ecstatic = require('ecstatic');

const project = require('./routes/project');

async function setup() {
  const app = express();

  app.use(history({
    rewrites: [
      {
        from: /^\/api.*$/,
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
    app.use(ecstatic({ root: 'dist/' }));
  }

  app.use('/api/project', project);

  app.listen(3000)
}

setup()
