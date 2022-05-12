import { USER_ROLES } from "../ENUM/userRoles";

export type signupInputDTO = {
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
};
