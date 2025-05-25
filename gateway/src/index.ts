import express from "express";
const app = express();

import ROUTES from "./config/routes.js";
import proxy from "./services/proxy.js";
import cookieParser from "cookie-parser";

app.use(cookieParser());

const port = process.env.PORT || 3000;

proxy.setupProxy(app, ROUTES);

app.listen(port, () => {
  console.log("Gateway running on port :" + port);
});
