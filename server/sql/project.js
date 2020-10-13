var ProjectSql = {
  // 增
  insert : 'INSERT INTO project(project_name) VALUES(?) ',
  // 删
  delete: 'DELETE FROM project WHERE project_id=? ',
  // 改
  update: 'UPDATE `project` SET project_name=? WHERE project_id=?',
  // 查
  getAll : 'SELECT * FROM project ',
  getById: 'SELECT * FROM project WHERE project_id=? ',
};

module.exports = ProjectSql;