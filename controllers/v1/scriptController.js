import Script from "../../models/scriptModel.js";

const currentDate = new Date();

export const findAllScripts = (req, res) => {
  Script.getAll((err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }
    return res.status(200).send(results);
  });
};

export const findScriptById = (req, res) => {
  Script.getById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }
    if (!results.length > 0) {
      return res.status(400).send({
        message: `Script with ${req.params.id} not found`,
      });
    }
    return res.status(200).send(results);
  });
};

export const createScript = (req, res) => {
  const { nasabahNim, asesorNim, title, content, attachLink } = req.body;

  if (!nasabahNim || !asesorNim || !title || !content || !attachLink) {
    return res.status(400).send({
      field: ["nasabahNim", "asesorNim", "title", "content", "attachLink"],
      message: "Body content can't be empty",
    });
  }

  const script = Script({
    nasabahNim: nasabahNim,
    asesorNim: asesorNim,
    sentDate: currentDate.toISOString().split("T")[0],
    eligibility: 0,
    status: 0,
    title: title,
    content: content,
    attachLink: attachLink,
  });

  Script.create(script, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    Script.getById(results.insertId, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }
      return res.status(201).send(results);
    });
  });
};

export const updateScriptById = (req, res) => {
  Script.getById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }
    if (!results.length > 0) {
      return res.status(400).send({
        message: `Script with ${req.params.id} not found`,
      });
    }

    const { asesorNim, title, content, attachLink, status, eligibility } =
      req.body;

    const script = Script({
      asesorNim: asesorNim,
      status: status,
      eligibility: eligibility,
      sentDate: currentDate.toISOString().split("T")[0],
      title: title,
      content: content,
      attachLink: attachLink,
    });

    Script.updateById(req.params.id, script, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      Script.getById(req.params.id, (err, results) => {
        if (err) {
          return res.status(500).send({
            error: err,
          });
        }
        return res.status(200).send(results);
      });
    });
  });
};

export const deleteScriptById = (req, res) => {
  Script.getById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }
    if (!results.length > 0) {
      return res.status(400).send({
        message: `Script with ${req.params.id} not found`,
      });
    }

    Script.deleteById(req.params.id, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      return res.status(200).send({
        message: "Script deleted successfully",
      });
    });
  });
};
