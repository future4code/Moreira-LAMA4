import { ConcertDatabase } from "../data/ConcertDatabase";
import { Concert } from "../model/Concert";
import { IdGenerator } from "../services/IdGenerator";
import { concertInputDTO } from "../types/DTO/concertInputDTO";

export class ConcertBusiness {
  constructor(
    private concertDatabase: ConcertDatabase,
    private idGenerator: IdGenerator
  ) {}

  public registerConcert = async (input: concertInputDTO): Promise<void> => {
    const { day, startTime, endTime, bandId } = input;
    const id = this.idGenerator.generateId();

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

    //Validação de banda = GET BAND BY ID

    const concert = new Concert(id, day, startTime, endTime, bandId);

    await this.concertDatabase.registerConcert(concert);
  };
}
