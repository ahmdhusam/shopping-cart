require("dotenv").config();
const mysql = require("mysql");

const { HOST_DB, USER_DB, PASS_DB, NAME_DB } = process.env;

function createDbConnection() {
  return mysql.createConnection({
    host: HOST_DB,
    user: USER_DB,
    password: "",
    database: NAME_DB,
  });
}

module.exports = () => createDbConnection;
