import con from "../configs/dbConfig.js";

const UserRole = ({ userNim = null, roleId = null }) => {
  return {
    userNim,
    roleId,
  };
};

UserRole.getByNim = (userNim, callback) => {
  const query = `
    SELECT roles.name, users.nim
    FROM users
    INNER JOIN user_role ON users.nim = user_role.userNim
    INNER JOIN roles ON user_role.roleId = roles.id
    WHERE users.nim = "${userNim}"
    `;
  con.query(query, function (err, results, field) {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

UserRole.create = (userRole, callback) => {
  con.query(
    `INSERT INTO user_role (userNim, roleId) VALUES ("${userRole.userNim}", "${userRole.roleId}")`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

UserRole.delete = (userRole, callback) => {
  con.query(
    `DELETE FROM user_role WHERE userNim = "${userRole.userNim}" && roleId = "${userRole.roleId}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

export default UserRole;
