import con from "../configs/dbConfig.js";

const currentDate = new Date();

const Script = ({
  nasabahNim = null,
  asesorNim = null,
  sentDate = null,
  status = null,
  eligibility = null,
  title = null,
  content = null,
  attachLink = null,
}) => {
  return {
    nasabahNim,
    asesorNim,
    sentDate,
    status,
    eligibility,
    title,
    content,
    attachLink,
  };
};

Script.getAll = (callback) => {
  con.query(`SELECT * FROM scripts`, function (err, results, field) {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

Script.getById = (id, callback) => {
  con.query(
    `SELECT * FROM scripts WHERE id = "${id}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

Script.create = (script, callback) => {
  con.query(
    `INSERT INTO scripts SET ?`,
    script,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

Script.updateById = (id, script, callback) => {
  con.query(
    `SELECT * FROM scripts WHERE id = "${id}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      con.query(
        `UPDATE scripts SET status = "${
          script.status ? script.status : results[0].status
        }", eligibility = "${
          script.eligibility ? script.eligibility : results[0].eligibility
        }", title = "${
          script.title ? script.title : results[0].title
        }", sentDate = "${
          script.sentDate ? script.sentDate : results[0].sentDate
        }", content = "${
          script.content ? script.content : results[0].content
        }", attachLink = "${
          script.attachLink ? script.attachLink : results[0].attachLink
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

Script.deleteById = (id, callback) => {
  con.query(
    `DELETE FROM scripts WHERE id = "${id}"`,
    function (err, results, field) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    }
  );
};

export default Script;
