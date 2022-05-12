import { USER_ROLES } from "../ENUM/USER_ROLES.TS";

export type signupInputDTO = {
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
};
