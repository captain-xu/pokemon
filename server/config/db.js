const Sequelize = require('sequelize');

const mysqlConfig = {
  host: 'mysql',
  port: 3306,
  user: 'root',
  password: 'sa123456',
  database: 'pokemon'
};

const sequelize = new Sequelize(
	mysqlConfig.database,
	mysqlConfig.user,
  mysqlConfig.password,
  {
		host: mysqlConfig.host,
		dialect: 'mysql'
	}
);

//测试数据库链接
sequelize.authenticate().then(function() {
  console.log("数据库连接成功");
}).catch(function(err) {
  //数据库连接失败时打印输出
  console.error(err);
  throw err;
});

exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
