import express from "express";
import cookieParser from "cookie-parser";

import { authenticateDbConnection } from "./config/database";
import validateEnv from "./config/validate-env";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

import AuthRouter from "./routes/auth.route";
import UserRouter from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

(async function () {
  // validating environment variables
  validateEnv();

  // validating db connection
  await authenticateDbConnection();
})();

// routing requests
app.use("/auth", UserRouter);
app.use("/auth", AuthRouter);

app.all("/{*any}", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
