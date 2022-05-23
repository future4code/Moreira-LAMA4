import { authenticationData } from "../../src/types/authenticationData";

export class AuthenticatorMock {
  public generate = (input: authenticationData): string => {
    return "token_mockado";
  };

  public getTokenData = (token: string) => {
    return {
      id: "id_mockado",
      role: "NORMAL",
    };
  }
}
