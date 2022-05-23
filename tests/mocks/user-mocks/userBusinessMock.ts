import { UserBusiness } from "../../../src/business/UserBusiness";
import { AuthenticatorMock } from "../AuthenticatorMock";
import { HashManagerMock } from "../HashManagerMock";
import { IdGeneratorMock } from "../IdGeneratorMock";
import { UserDatabaseMock } from "./UserDataBaseMock";

export const userBusinessMock = new UserBusiness(
  new UserDatabaseMock() as any,
  new IdGeneratorMock(),
  new HashManagerMock(),
  new AuthenticatorMock()
);
