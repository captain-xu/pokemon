const projectService = require('../services/project.service');

exports.list = (req, res, next) => {
  var results = [];
  projectService.getAllProjects(req.query, (rows) => {
    results = rows;
    res.send({
      code: 0,
      message: 'success',
      response: {
        project_list: results,
      },
    })
  }, (err) => {
    console.log(err)
  });
};

exports.insert = (req, res, next) => {
  const param = req.body;
  if (!param.project_name) {
    res.send({
      code: 0,
      message: '项目名称不能为空',
    })
    return
  }
  projectService.addProjectItem(param, () => {
    res.send({
      code: 0,
      message: 'success',
    })
  }, (err) => {
    console.log(err)
  });
};