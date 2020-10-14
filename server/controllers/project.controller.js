const projectService = require('../services/project.service');

exports.list = (req, res, next) => {
  projectService.getAllProjects(req.query).then(rows => {
    res.status(200).json({
      code: 0,
      message: 'success',
      response: {
        project_list: rows,
      },
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.insert = (req, res, next) => {
  const param = req.body;
  if (!param.project_name) {
    res.status(200).json({
      code: -1,
      message: '项目名称不能为空',
    })
    return
  }
  projectService.addProjectItem(param).then(() => {
    res.status(200).json({
      code: 0,
      message: 'success',
    })
  }).catch(err => {
    console.log(err)
  })
};

exports.delete = (req, res, next) => {
  const param = req.body;
  projectService.deleteProjectItem(param).then(() => {
    res.status(200).json({
      code: 0,
      message: 'success',
    })
  }).catch(err => {
    console.log(err)
  })
};