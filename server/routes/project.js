const express = require('express');
const router = express.Router();

const db = require('../db');
const projectSql = require('../sql/project');

router.get('/', function(req, res, next) {
  var results = {};
  db.query(projectSql.query, [], function (err, rows) {
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


module.exports = router;