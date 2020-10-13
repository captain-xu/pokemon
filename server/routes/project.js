const express = require('express');
const router = express.Router();

const db = require('../db');
const projectSql = require('../sql/project');

router.get('/', function(req, res, next) {
  var results = [];
  db.query(projectSql.getAll, [], function (err, rows) {
    results = rows;
    res.send({
      code: 0,
      message: 'ok',
      response: {
        project_list: results,
      },
    })
  });
});

router.post('/', function(req, res, next) {
  const param = req.body;
  if (!param.project_name) {
    res.send({
      code: 0,
      message: '项目名称不能为空',
    })
    return
  }
  db.query(projectSql.insert, [param.project_name], function (err) {
    res.send({
      code: 0,
      message: 'ok',
    })
  });
});


module.exports = router;