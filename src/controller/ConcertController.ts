import { Request, Response } from "express";
import { ConcertBusiness } from "../business/ConcertBusiness";
import { concertInputDTO } from "../types/DTO/concertInputDTO";

export class ConcertController {
  constructor(private concertBusiness: ConcertBusiness) {}

  public registerConcert = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { day, startTime, endTime, bandId } = req.body;
      const input: concertInputDTO = {
        day,
        startTime,
        endTime,
        bandId,
      };

      await this.concertBusiness.registerConcert(input);

      res.status(201).send("Show registrado com sucesso!");
    } catch (error: any) {
      console.log(error)
      switch (error.message) {
        case "Preencha todos os campos.":
          res.status(422).send(error.message);
          break;
        case "Shows só podem ser agendados para 'sexta', 'sabado' ou 'domingo'.":
          res.status(422).send(error.message);
          break;
        case "Horários devem ser números.":
          res.status(422).send(error.message);
          break;
        case "Shows só podem ser agendados para horários a partir das 8h00.":
          res.status(422).send(error.message);
          break;
        case "Erro no banco de dados.":
          res.status(500).send(error.message);
          break;
        default:
          res.status(500).send("Erro do servidor.");
      }
    }
  };
}
