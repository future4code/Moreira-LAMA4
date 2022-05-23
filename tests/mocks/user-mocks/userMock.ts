import { User } from "../../../src/model/User";

export const userMock = new User(
  "id mockado",
  "nome mockado",
  "email mockado",
  "password mockado",
  "NORMAL"
);

export const otherUserMock = new User(
  "outro id mockado",
  "outro nome mockado",
  "outro email mockado",
  "outro password mockado",
  "ADMIN"
);
