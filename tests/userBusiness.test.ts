import { loginInputMock } from "./mocks/user-mocks/loginInputMock";
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

describe("Teste de login", () => {
  test("Deve retornar um erro se o email não for informado.", async () => {
    expect.assertions;
    try {
      const token = await userBusinessMock.login(noEmailInputMock);
      expect(token).toBe(undefined);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Verifique se todos os campos foram preenchidos."
      );
    }
  });

  test("Deve retornar um erro se a senha não for informada.", async () => {
    expect.assertions;
    try {
      const token = await userBusinessMock.login(noPasswordInputMock);
      expect(token).toBe(undefined);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Verifique se todos os campos foram preenchidos."
      );
    }
  });

  test("Deve realizar o login.", async () => {
    expect.assertions;
    try {
      const token = await userBusinessMock.login(loginInputMock);
      expect(token).toBeDefined();
    } catch (error: any) {}
  });
});
