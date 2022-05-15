import { concertBusiness } from "./mocks/concert-mocks/concertBusinessMock";
import { ConcertDatabaseMock } from "./mocks/concert-mocks/ConcertDatabaseMock";
import { concertMock } from "./mocks/concert-mocks/concertMock";
import {
  noDayInputMock,
  noBandIdInputMock,
  wrongDayInputMock,
  invalidStartTimeInputMock,
} from "./mocks/concert-mocks/registerConcertInputMock";
describe("Testes de registro de show", () => {
  test("Retorna erro se o campo 'day' não for enviado.", async () => {
    expect.assertions;
    try {
      await concertBusiness.registerConcert(noDayInputMock);
    } catch (error: any) {
      expect(error.message).toEqual("Preencha todos os campos.");
    }
  });
  test("Retorna erro se o campo 'band id' não for enviado.", async () => {
    expect.assertions;
    try {
      await concertBusiness.registerConcert(noBandIdInputMock);
    } catch (error: any) {
      expect(error.message).toEqual("Preencha todos os campos.");
    }
  });
  test("Retorna erro se o dia enviado não for 'sexta', 'sabado' ou 'domingo'.", async () => {
    expect.assertions;
    try {
      await concertBusiness.registerConcert(wrongDayInputMock);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Shows só podem ser agendados para 'sexta', 'sabado' ou 'domingo'."
      );
    }
  });
  test("Retorna erro se o input de 'start time' for menor do que o horário mínimo para início de um show.", async () => {
    expect.assertions;
    try {
      await concertBusiness.registerConcert(invalidStartTimeInputMock);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Shows só podem ser agendados para horários a partir das 8h00."
      );
    }
  });
  test("Retorna erro se houver tentativa de registro de show para mesma data e horário de outro show", async () => {
    expect.assertions;
    try {
      const foundConcert =
        await new ConcertDatabaseMock().uniqueConcertVerifier(concertMock);
      expect(foundConcert).toEqual([concertMock]);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Não é possível agendar um show para um horário em que outra banda esteja se apresentando."
      );
    }
  });
});

describe("Testes de requisição de show", () => {
  test("Deve retornar um erro ao buscar shows de dias que não sejam 'sexta', 'sabado' ou 'domingo'.", async () => {
    try {
      const result = await concertBusiness.getConcertsByDay("segunda");
      expect(result).toBe(undefined);
    } catch (error: any) {
      expect(error.message).toEqual("Os shows só ocorrem de sexta a domingo.");
    }
  });
});
