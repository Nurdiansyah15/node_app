import con from "../../configs/dbConfig.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/userModel.js";
dotenv.config();

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }

    User.getByRefreshToken(refreshToken, (err, results) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      if (!results.length > 0) {
        return res.status(404).send({
          message: "Refresh token not found",
        });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(403).json({
              message: "Refresh token expired",
            });
          }

          const nim = results[0].nim;

          const newAccessToken = jwt.sign(
            { nim },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "60s" }
          );

          const newRefreshToken = jwt.sign(
            { nim },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );

          User.updateByNim(
            nim,
            { refreshToken: newRefreshToken },
            (err, results) => {
              if (err) {
                return res.status(500).send({
                  error: err,
                });
              }

              res.cookie("refreshToken", newRefreshToken, {
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
                  obj.accessToken = newAccessToken;
                });

                return res.status(200).send(results);
              });
            }
          );
        }
      );
    });
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
  }
};
