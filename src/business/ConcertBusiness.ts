import { BandDatabase } from "../data/BandDatabase";
import { ConcertDatabase } from "../data/ConcertDatabase";
import { Band } from "../model/Band";
import { Concert } from "../model/Concert";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { concertInputDTO } from "../types/DTO/concertInputDTO";

export class ConcertBusiness {
  constructor(
    private concertDatabase: ConcertDatabase,
    private bandDatabase: BandDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  public registerConcert = async (input: concertInputDTO): Promise<void> => {
    const { day, startTime, endTime, bandId, token } = input;
    const id = this.idGenerator.generateId();

    //Identificação do usuário
    if (!token) {
      throw new Error("Usuário não identificado.");
    }

    //Validação de preenchimento de dados
    if (!day || !startTime || !endTime || !bandId) {
      throw new Error("Preencha todos os campos.");
    }

    //Validação de dia da semana
    if (
      day.toLowerCase() !== "sexta" &&
      day.toLowerCase() !== "sabado" &&
      day.toLowerCase() !== "domingo"
    ) {
      throw new Error(
        "Shows só podem ser agendados para 'sexta', 'sabado' ou 'domingo'."
      );
    }

    //Validação de horário
    if (typeof startTime !== "number" || typeof endTime !== "number") {
      throw new Error("Horários devem ser números.");
    }

    if (startTime < 8) {
      throw new Error(
        "Shows só podem ser agendados para horários a partir das 8h00."
      );
    }

    if (startTime > 23 || endTime > 23) {
      throw new Error("Formato de hora inválido.");
    }

    //Validação de banda
    const foundBand: Band = await this.bandDatabase.getBandById(bandId);
    if (!foundBand) {
      throw new Error("Banda não encontrada.");
    }

    //Validação de admin
    const userData = this.authenticator.getTokenData(token);
    if (userData.role !== "ADMIN") {
      throw new Error(
        'O usuário não possui permissão para cadastrar o show. Apenas usuários com role "admin" podem realizar esta tarefa.'
      );
    }

    //Validação de show único no horário
    const concert = new Concert(id, day, startTime, endTime, bandId);
    const foundConcert = await this.concertDatabase.uniqueConcertVerifier(
      concert
    );
    if (foundConcert) {
      throw new Error(
        "Não é possível agendar um show para um horário em que outra banda esteja se apresentando."
      );
    }

    await this.concertDatabase.registerConcert(concert);
  };

  public getConcertsByDay = async (day: string): Promise<Concert[]> => {
    if (
      day.toLowerCase() !== "sexta" &&
      day.toLowerCase() !== "sabado" &&
      day.toLowerCase() !== "domingo"
    ) {
      throw new Error("Os shows só ocorrem de sexta a domingo.");
    }

    const result = await this.concertDatabase.getConcertsByDay(day);

    return result;
  };
}
