import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
  protected table: string = "lama_bands";

  public signBand = async (band: Band): Promise<void> => {
    try {
      await this.connection(this.table).insert({
        id: band.getId(),
        name: band.getName(),
        music_genre: band.getMusicGenre(),
        responsible: band.getResponsible(),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro na conexão com o banco de dados");
      }
    }
  };

  public getBandByName = async (name: string): Promise<Band> => {
    try {
      const [result] = await this.connection(this.table).whereILike(
        "name",
        name
      );
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro no banco de dados.");
      }
    }
  };

  public getBandById = async (id: string) => {
    try {
      const [result] = await this.connection(this.table).where("id", id);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro no banco de dados.");
      }
    }
  };
}
