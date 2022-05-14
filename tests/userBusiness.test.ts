import {
  noEmailInputMock,
  noNameInputMock,
  noPasswordInputMock,
  noRoleInputMock,
} from "./mocks/user-mocks/signupInputMock";
import { userBusinessMock } from "./mocks/user-mocks/userBusinessMock";

describe("Testes de signup", () => {
  test("Retorna um erro quando o campo 'name' não é preenchido", async () => {
    expect.assertions;
    try {
      await userBusinessMock.signup(noNameInputMock);
    } catch (error: any) {
      expect(error.message).toEqual("Preencha todos os campos.");
    }
  });

  test("Retorna um erro quando o campo 'email' não é preenchido", async () => {
    expect.assertions;
    try {
      await userBusinessMock.signup(noEmailInputMock);
    } catch (error: any) {
      expect(error.message).toEqual("Preencha todos os campos.");
    }
  });

  test("Retorna um erro quando o campo 'password' não é preenchido", async () => {
    expect.assertions;
    try {
      await userBusinessMock.signup(noPasswordInputMock);
    } catch (error: any) {
      expect(error.message).toEqual("Preencha todos os campos.");
    }
  });

  test("Retorna um erro quando o campo 'role' não é preenchido", async () => {
    expect.assertions;
    try {
      await userBusinessMock.signup(noRoleInputMock);
    } catch (error: any) {
      expect(error.message).toEqual("Preencha todos os campos.");
    }
  });
});



