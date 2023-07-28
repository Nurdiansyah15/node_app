import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// var con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

const con = mysql.createConnection(process.env.DATABASE_URL);

con.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

export default con;
