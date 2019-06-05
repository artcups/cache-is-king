const mysql = require("mysql");
const { promisify } = require("util");
const pool = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  port     : 3306
});

pool.query = promisify(pool.query) // Magic happens here.
module.exports = pool
