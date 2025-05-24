import express from 'express';

import validateEnv from './config/validate-env';
import { authenticateDbConnection } from './config/database';

const app = express();

(async function () {
  // validating environment variables
  validateEnv();

  // validating db connection
  await authenticateDbConnection();
})();

// Sending routes

export default app;