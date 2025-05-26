import { Container } from "inversify";
import TYPES from "./types";
import { ProfileController } from "../controller/profile.controller";
import { ProfileService } from "../service/profile.service";

const container = new Container();

container
  .bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController);

container.bind<ProfileService>(TYPES.ProfileService).to(ProfileService);

export default container;
