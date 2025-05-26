import { Container } from "inversify";
import TYPES from "./types";
import { ProfileController } from "../controller/profile.controller";

const container = new Container();

container
  .bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController);

export default container;
