import { Concert } from "../../../src/model/Concert";
import { concertMock } from "./concertMock";

export class ConcertDatabaseMock {
  public registerConcert = async (concert: Concert): Promise<void> => {};

  public uniqueConcertVerifier = async (
    concert: Concert
  ): Promise<Concert[] | undefined> => {
    if (concert === concertMock) {
      return [concertMock];
    } else {
      return undefined;
    }
  };

  public getConcertsByDay = async (
    day: string
  ): Promise<Concert[] | undefined> => {
    if (day === "sexta" || day === "sabado" || day === "domingo") {
      return [concertMock];
    } else {
      return undefined;
    }
  };
}
