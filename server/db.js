
const mysql = require('mysql')
let pool = mysql.createPool({
  host: 'mysql',
  port: 3306,
  user: 'root',
  password: 'sa123456',
  database: 'pokemon'
})

function query(sql, values, callback) {
  console.log("db pool");
  pool.getConnection(function (err, connection) {
    if(err) throw err;
    console.log("get connection ");
    //Use the connection
    connection.query(sql, values, function (err, results, fields) {
      console.log(JSON.stringify(results));
      //每次查询都会 回调
      callback(err, results);
      //只是释放链接，在缓冲池了，没有被销毁
      connection.release();
      if(err) throw err;
    });
  });
}

exports.query = query;