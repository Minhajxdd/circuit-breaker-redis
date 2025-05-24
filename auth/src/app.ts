import express from "express";

import validateEnv from "./config/validate-env";
import { authenticateDbConnection } from "./config/database";
import AuthRouter from './routes/auth.route';
import { errorHandler } from "./middlewares/error-handler";

const app = express();

(async function () {
  // validating environment variables
  validateEnv();

  // validating db connection
  await authenticateDbConnection();
})();

// routing requests
app.use('/auth', AuthRouter);

app.use(errorHandler);

export default app;
