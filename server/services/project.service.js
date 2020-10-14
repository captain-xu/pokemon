const projectModel = require('../models/project.model');


exports.getAllProjects = (query, cb, onErr) => {
  projectModel.findAll().then(res => {
    cb(res)
  }).catch(err => {
    onErr(err)
  })
};

exports.addProjectItem = (param, cb, onErr) => {
  projectModel.create(param).then(res => {
    cb(res)
  }).catch(err => {
    onErr(err)
  })
};