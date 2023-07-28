import checkDuplicateEntry from "../../helpers/checkDuplicateEntry.js";
import Role from "../../models/roleModel.js";
import User from "../../models/userModel.js";
import UserRole from "../../models/userRoleModel.js";

export const findUserRoleByNim = (req, res) => {
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

    UserRole.getByNim(req.params.nim, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      return res.status(200).send(results);
    });
  });
};

export const addUserRoleByNim = (req, res) => {
  const { roleName } = req.body;

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

    if (!roleName) {
      return res.status(400).send({
        field: ["roleName"],
        message: "Body content can't be empty",
      });
    }

    Role.getByName(roleName, (err, role) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      if (!role.length > 0) {
        return res.status(400).send({
          message: "Role not found",
        });
      }

      UserRole.getByNim(req.params.nim, (err, results) => {
        if (err) {
          return res.status(500).send({
            error: err,
          });
        }

        if (checkDuplicateEntry(roleName, results)) {
          return res.status(400).send({
            message: "Role already exists",
          });
        }

        let userRole = UserRole({
          userNim: req.params.nim,
          roleId: role[0].id,
        });

        UserRole.create(userRole, (err, results) => {
          if (err) {
            return res.status(500).send({
              error: err,
            });
          }

          UserRole.getByNim(req.params.nim, (err, results) => {
            if (err) {
              return res.status(500).send({
                error: err,
              });
            }

            return res.status(201).send(results);
          });
        });
      });
    });
  });
};

export const removeUserRoleByNim = (req, res) => {
  const { roleName } = req.body;

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

    if (!roleName) {
      return res.status(400).send({
        field: ["roleName"],
        message: "Body content can't be empty",
      });
    }

    Role.getByName(roleName, (err, role) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      if (!role.length > 0) {
        return res.status(400).send({
          message: "Role not found",
        });
      }

      UserRole.getByNim(req.params.nim, (err, results) => {
        if (err) {
          return res.status(500).send({
            error: err,
          });
        }

        if (!checkDuplicateEntry(roleName, results)) {
          return res.status(400).send({
            message: "Role not found",
          });
        }

        let userRole = UserRole({
          userNim: req.params.nim,
          roleId: role[0].id,
        });

        UserRole.delete(userRole, (err, results) => {
          if (err) {
            return res.status(500).send({
              error: err,
            });
          }

          return res.status(200).send({
            message: `${req.params.nim}'s user role ${roleName} deleted`,
          });
        });
      });
    });
  });
};
