import con from "../configs/dbConfig.js";

const User = ({
  nim = null,
  password = null,
  name = null,
  refreshToken = null,
  waNum = null,
  faculty = null,
  major = null,
}) => {
  return {
    nim,
    name,
    password,
    refreshToken,
    waNum,
    faculty,
    major,
  };
};

User.getAll = (callback) => {
  con.query(`SELECT * FROM users`, function (err, results, field) {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

User.getByNim = (nim, callback) => {
  con.query(
    `SELECT * FROM users WHERE nim = "${nim}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

User.getByRefreshToken = (refreshToken, callback) => {
  con.query(
    `SELECT * FROM users WHERE refreshToken = "${refreshToken}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

User.updateByNim = (nim, user, callback) => {
  con.query(
    `SELECT * FROM users WHERE nim = "${nim}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }

      con.query(
        `UPDATE users SET name = "${
          user.name ? user.name : results[0].name
        }", refreshToken = "${
          user.refreshToken ? user.refreshToken : results[0].refreshToken
        }", waNum = "${
          user.waNum ? user.waNum : results[0].waNum
        }", faculty = "${
          user.faculty ? user.faculty : results[0].faculty
        }", major = "${
          user.major ? user.major : results[0].major
        }" WHERE nim = "${nim}"`,
        function (err, results, field) {
          if (err) {
            return callback(err, null);
          }
          return callback(null, results);
        }
      );
    }
  );
};

User.create = (user, callback) => {
  con.query(`INSERT INTO users SET ?`, user, function (err, results, field) {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

User.deleteByNim = (nim, callback) => {
  con.query(
    `DELETE FROM users WHERE nim = "${nim}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

export default User;
