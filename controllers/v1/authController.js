import con from "../../configs/dbConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/userModel.js";
dotenv.config();

export const login = async (req, res) => {
  const { nim, password } = req.body;

  if (!password || !nim) {
    return res.status(400).send({
      field: ["nim", "password"],
      message: "Body content can't be empty",
    });
  }

  User.getByNim(nim, async (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    if (!results.length > 0) {
      return res.status(400).send({
        message: "Credential is not registered",
      });
    }
    const match = await bcrypt.compare(password, results[0].password);

    if (!match) {
      return res.status(400).send({
        message: "Password is invalid",
      });
    }

    const accessToken = jwt.sign({ nim }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60s",
    });

    const refreshToken = jwt.sign({ nim }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    User.updateByNim(nim, { refreshToken: refreshToken }, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      User.getByNim(nim, (err, results) => {
        if (err) {
          return res.status(500).send({
            error: err,
          });
        }

        results.filter((obj) => {
          delete obj.password;
          obj.accessToken = accessToken;
        });

        return res.status(200).send(results);
      });
    });
  });
};

export const register = async (req, res) => {
  const { nim, name, password, confPassword } = req.body;

  if (!nim || !name || !password || !confPassword) {
    return res.status(400).send({
      field: ["nim", "name", "password", "confPassword"],
      message: "Body content can't be empty",
    });
  }
  if (password !== confPassword) {
    return res.status(400).send({
      message: "Confirmed password must be same",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  let user = User({ nim: nim, name: name, password: hashPassword });

  //   console.log(user);
  User.create(user, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }

    User.getByNim(nim, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }
      results.filter((obj) => {
        delete obj.password;
      });
      return res.status(201).send(results);
    });
  });
};

export const logout = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(202).send({
      message: "You have already logout",
    });
  }

  User.getByRefreshToken(refreshToken, (err, results) => {
    if (err) {
      return res.status(500).send({
        error: err,
      });
    }
    if (!results.length > 0) {
      res.clearCookie("refreshToken");

      return res.status(202).send({
        message: "You have already logout",
      });
    }

    const nim = results[0].nim;

    User.updateByNim(nim, { refreshToken: null }, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      res.clearCookie("refreshToken");
      return res.status(200).json({
        message: "Logout",
      });
    });
  });
};
