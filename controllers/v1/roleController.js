import Role from "../../models/roleModel.js";

export const findAllRoles = (req, res) => {
  Role.getAll((err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    return res.status(200).send(results);
  });
};

export const findRoleById = (req, res) => {
  Role.getById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    if (!results.length > 0) {
      return res.status(400).send({
        message: `Role with ${req.params.id} not found`,
      });
    }

    return res.status(200).send(results);
  });
};

export const createRole = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({
      field: ["name"],
      message: "Body content can't be empty",
    });
  }

  Role.getByName(name, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    if (results.length > 0) {
      return res.status(400).send({
        message: "Role already exists",
      });
    }

    Role.create(req.body, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }
      Role.getById(results.insertId, (err, results) => {
        if (err) {
          return res.status(500).send({
            error: err,
          });
        }

        return res.status(201).send(results);
      });
    });
  });
};

export const updateRoleById = (req, res) => {
  const { name } = req.body;

  Role.getById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    if (!results.length > 0) {
      return res.status(400).send({
        message: `Role with ${req.params.id} not found`,
      });
    }

    if (!name) {
      return res.status(400).send({
        field: ["name"],
        message: "Body content can't be empty",
      });
    }

    Role.updateById(req.params.id, req.body, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      Role.getById(req.params.id, (err, results) => {
        if (err) {
          return res.status(500).send({
            error: err,
          });
        }

        return res.status(201).send(results);
      });
    });
  });
};

export const deleteRoleById = (req, res) => {
  Role.getById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    if (!results.length > 0) {
      return res.status(400).send({
        message: `Role with ${req.params.id} not found`,
      });
    }

    Role.deleteById(req.params.id, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      return res.status(200).send({
        message: "Role deleted successfully",
      });
    });
  });
};
