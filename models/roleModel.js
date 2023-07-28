import con from "../configs/dbConfig.js";

const Role = (name) => {
  return {
    name,
  };
};

Role.getById = (id, callback) => {
  con.query(
    `SELECT * FROM roles WHERE id = "${id}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

Role.getByName = (name, callback) => {
  con.query(
    `SELECT * FROM roles WHERE name = "${name}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

Role.getAll = (callback) => {
  con.query(`SELECT * FROM roles`, function (err, results, field) {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

Role.create = (role, callback) => {
  con.query(`INSERT INTO roles SET ?`, role, function (err, results, field) {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

Role.updateById = (id, role, callback) => {
  con.query(
    `SELECT * FROM roles WHERE id = "${id}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      con.query(
        `UPDATE roles SET name = "${
          role.name ? role.name : results[0].name
        }" WHERE id = "${id}"`,
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

Role.deleteById = (id, callback) => {
  con.query(
    `DELETE FROM roles WHERE id = "${id}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};
export default Role;
