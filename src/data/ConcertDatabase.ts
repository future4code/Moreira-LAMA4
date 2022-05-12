import { Concert } from "../model/Concert";
import { BaseDatabase } from "./BaseDatabase";

export class ConcertDatabase extends BaseDatabase {
  protected TABLE_NAME = "lama_shows";

  public registerConcert = async (concert: Concert): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        id: concert.getId(),
        week_day: concert.getDay(),
        start_time: concert.getStartTime(),
        end_time: concert.getEndTime(),
        band_id: concert.getBandId(),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro no banco de dados.");
      }
    }
  };
}
