import express from "express";

import validateEnv from "./config/validate-env";
import { authenticateDbConnection } from "./config/database";
import AuthRouter from './routes/auth.route';

const app = express();

(async function () {
  // validating environment variables
  validateEnv();

  // validating db connection
  await authenticateDbConnection();
})();

// routing requests
app.use('/auth', AuthRouter);


export default app;
