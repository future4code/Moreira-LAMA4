import { bandBusinessMock } from "./mocks/band-mocks/bandBusinessMock";
import { bandMock } from "./mocks/band-mocks/bandMock";
import {
  noIdGetBandInputMock,
  noInfoGetBandInputMock,
  noNameGetBandInputMock,
} from "./mocks/band-mocks/getBandInputMock";
import {
  noMusicGenreInputMock,
  noNameInputMock,
  noResponsibleInputMock,
  registerBandInputMock,
} from "./mocks/band-mocks/registerBandInputMock";

describe("Testes de registro de banda", () => {
  test("Deve retornar um erro ao tentar registrar uma banda sem enviar seu nome", async () => {
    expect.assertions;
    try {
      await bandBusinessMock.signBand(noNameInputMock);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Verifique se todos os campos foram preenchidos."
      );
    }
  });
  test("Deve retornar um erro ao tentar registrar uma banda sem enviar seu gênero", async () => {
    expect.assertions;
    try {
      await bandBusinessMock.signBand(noMusicGenreInputMock);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Verifique se todos os campos foram preenchidos."
      );
    }
  });
  test("Deve retornar um erro ao tentar registrar uma banda sem enviar seu responsável", async () => {
    expect.assertions;
    try {
      await bandBusinessMock.signBand(noResponsibleInputMock);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Verifique se todos os campos foram preenchidos."
      );
    }
  });
});

describe("Testes de requisição de banda", () => {
  test("Deve retornar um erro se nome e id não forem inseridos.", async () => {
    expect.assertions;
    try {
      const response = await bandBusinessMock.getDetails(
        noInfoGetBandInputMock
      );
      expect(response).toBe(undefined);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Nome e/ou id da banda devem ser informados."
      );
    }
  });
  test("Deve retornar uma banda se nome for fornecido, mas id não.", async () => {
    expect.assertions;
    try {
      const response = await bandBusinessMock.getDetails(noIdGetBandInputMock);
      expect(response).toBe(bandMock);
    } catch (error: any) {}
  });
  test("Deve retornar uma banda se id for fornecido, mas nome não.", async () => {
    expect.assertions;
    try {
      const response = await bandBusinessMock.getDetails(
        noNameGetBandInputMock
      );
      expect(response).toBe(bandMock);
    } catch (error: any) {}
  });
  test("Deve registrar uma banda.", async () => {
    expect.assertions;
    try {
      await bandBusinessMock.signBand(registerBandInputMock);
      expect(bandBusinessMock.signBand).toBeCalled();
    } catch (error: any) {
      expect(error.message).toEqual(
        'O usuário não possui permissão para cadastrar a banda. Apenas usuários com role "admin" podem realizar esta tarefa.'
      );
    }
  });
});
