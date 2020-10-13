var ProjectSql = {
  insert : 'INSERT INTO Project(project_name) VALUES(?) ',
  query : 'SELECT * FROM project ',
  getProjectById: 'SELECT * FROM project WHERE project_id = ? '
};

module.exports = ProjectSql;