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
      const token = req.headers.authorization as string;
      const input: concertInputDTO = {
        day,
        startTime,
        endTime,
        bandId,
        token,
      };

      await this.concertBusiness.registerConcert(input);

      res.status(201).send("Show registrado com sucesso!");
    } catch (error: any) {
      switch (error.message) {
        case "Usuário não identificado.":
          res.status(401).send(error.message);
          break;
        case "Preencha todos os campos.":
          res.status(422).send(error.message);
          break;
        case "Shows só podem ser agendados para 'sexta', 'sabado' ou 'domingo'.":
          res.status(422).send(error.message);
          break;
        case "Formato de hora inválido.":
          res.status(422).send(error.message);
          break;
        case "Horários devem ser números.":
          res.status(422).send(error.message);
          break;
        case "Shows só podem ser agendados para horários a partir das 8h00.":
          res.status(422).send(error.message);
          break;
        case "Banda não encontrada.":
          res.status(404).send(error.message);
          break;
        case 'O usuário não possui permissão para cadastrar o show. Apenas usuários com role "admin" podem realizar esta tarefa.':
          res.status(403).send(error.message);
          break;
        case "Não é possível agendar um show para um horário em que outra banda esteja se apresentando.":
          res.status(422).send(error.message);
          break;
        case "Erro no banco de dados.":
          res.status(500).send(error.message);
          break;
        default:
          res.status(500).send("Erro do servidor.");
          break;
      }
    }
  };

  public getConcertsByDay = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const day = req.query.day as string;
      const result = await this.concertBusiness.getConcertsByDay(day);

      res.status(200).send(result);
    } catch (error: any) {
      switch (error.message) {
        case "Os shows só ocorrem de sexta a domingo.":
          res.status(422).send(error.message);
          break;
        default:
          res.status(500).send("Erro do servidor.");
          break;
      }
    }
  };
}
