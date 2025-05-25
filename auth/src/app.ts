import express from "express";

import validateEnv from "./config/validate-env";
import { authenticateDbConnection } from "./config/database";
import AuthRouter from './routes/auth.route';
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

(async function () {
  // validating environment variables
  validateEnv();

  // validating db connection
  await authenticateDbConnection();
})();

// routing requests
app.use('/auth', AuthRouter);

app.all("/{*any}", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
