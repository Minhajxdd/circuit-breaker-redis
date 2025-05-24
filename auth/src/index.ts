import express from "express";

import {authenticateDbConnection} from './config/database';
import validateEnv from './config/validate-env';

// validating environment variables
validateEnv();

// validating db connection
authenticateDbConnection();

const app = express();

const PORT = process.env.PORT || 3000;

app.all('/auth', (req, res) => {
  res.send('auth service');
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
