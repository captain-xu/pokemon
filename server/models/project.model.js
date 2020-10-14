const {sequelize, Sequelize} = require('../config/db')

const projectModel = sequelize.define('project', {
  project_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false, //非空
    autoIncrement: true, //自动递增
    primaryKey: true //主键
  },
  project_name: {
    type: Sequelize.STRING(45),
    allowNull: false,
  }
}, {
  timestamps: false,
  freezeTableName: true, // Model 对应的表名将与model名相同
});

module.exports = projectModel;