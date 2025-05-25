import express from "express";
const app = express();

import ROUTES from './config/routes.js';
import proxy from './services/proxy.js';
import { errorHandler } from "./middlewares/error-handler.js";

const port = process.env.PORT || 3000;

proxy.setupProxy(app, ROUTES);

app.use(errorHandler);

app.listen(port, () => {
    console.log("Gateway running on port :" + port);
});
