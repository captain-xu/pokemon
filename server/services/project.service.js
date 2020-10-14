const projectModel = require('../models/project.model');


exports.getAllProjects = (query) => {
  return projectModel.findAll()
};

exports.addProjectItem = (param) => {
  return projectModel.create(param)
};

exports.deleteProjectItem = (param) => {
  return projectModel.destroy({
		where: {
			...param
		}
	})
};