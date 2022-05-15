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

  public uniqueConcertVerifier = async (concert: Concert) => {
    try {
      const concerts = await this.connection(this.TABLE_NAME)
        .select("start_time", "end_time")
        .where("week_day", concert.getDay());

      const result = [];
      for (let scheduledConcert of concerts) {
        if (
          (concert.getStartTime() < scheduledConcert.start_time &&
            concert.getEndTime() > scheduledConcert.start_time) ||
          (concert.getStartTime() > scheduledConcert.start_time &&
            concert.getStartTime() < scheduledConcert.end_time &&
            concert.getEndTime() > scheduledConcert.end_time) ||
          (concert.getStartTime() === scheduledConcert.start_time &&
            concert.getEndTime() === scheduledConcert.end_time)
        ) {
          result.push(scheduledConcert);
        }
      }
      return result[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro no banco de dados.");
      }
    }
  };

  public getConcertsByDay = async (day: string) => {
    try {
      const concerts = await this.connection(this.TABLE_NAME)
        .join("lama_bands", "lama_shows.band_id", "lama_bands.id")
        .select("lama_bands.name", "lama_bands.music_genre")
        .where("lama_shows.week_day", day)
        .orderBy("lama_shows.start_time", "desc");

      return concerts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro no banco de dados.");
      }
    }
  };
}
