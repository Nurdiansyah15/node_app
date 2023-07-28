import User from "../../models/userModel.js";
import UserRole from "../../models/userRoleModel.js";

export const findAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }
    results.filter((obj) => {
      delete obj.password;
      delete obj.refreshToken;
    });

    return res.status(200).send(results);
  });
};

export const findUserByNim = (req, res) => {
  User.getByNim(req.params.nim, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    if (!results.length > 0) {
      return res.status(400).send({
        message: `User with ${req.params.nim} not found`,
      });
    }

    UserRole.getByNim(req.params.nim, (err, role) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }
      results.filter((obj) => {
        delete obj.password;
        delete obj.refreshToken;
        obj.role = role;
      });

      return res.status(200).send(results);
    });
  });
};

export const updateUserByNim = (req, res) => {
  User.getByNim(req.params.nim, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    if (!results.length > 0) {
      return res.status(400).send({
        message: `User with ${req.params.nim} not found`,
      });
    }

    User.updateByNim(req.params.nim, req.body, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      User.getByNim(req.params.nim, (err, results) => {
        if (err) {
          return res.status(500).send({
            error: err,
          });
        }
        results.filter((obj) => {
          delete obj.password;
          delete obj.refreshToken;
        });
        return res.status(201).send(results);
      });
    });
  });
};

export const deleteUserByNim = (req, res) => {
  User.getByNim(req.params.nim, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    if (!results.length > 0) {
      return res.status(400).send({
        message: `User with ${req.params.nim} not found`,
      });
    }

    User.deleteByNim(req.params.nim, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      return res.status(200).send({
        message: "User deleted successfully",
      });
    });
  });
};
