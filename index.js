import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import createError from "http-errors";
import con from "./configs/dbConfig.js";
import { verifyToken } from "./middlewares/verifyToken.js";
import authRouter from "./routes/v1/auth.js";
import userRouter from "./routes/v1/user.js";
import refreshTokenRouter from "./routes/v1/refreshToken.js";
import roleRouter from "./routes/v1/role.js";
import userRoleRouter from "./routes/v1/userRole.js";
import scriptRouter from "./routes/v1/script.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hallo",
  });
});

// app.use("/api/v1", verifyToken, userRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", refreshTokenRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", roleRouter);
app.use("/api/v1", userRoleRouter);
app.use("/api/v1", scriptRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, () => console.log(`Server running at port ${port}`));
