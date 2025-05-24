// inversify.config.ts
import { Container } from "inversify";
import TYPES from "./types";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";

const container = new Container();

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);

export default container;
