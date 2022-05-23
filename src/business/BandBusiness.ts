import { BandDatabase } from "../data/BandDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Band } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { GetBandDetailsDTO } from "../types/DTO/GetBandDetailsDTO";
import { signBandInputDTO } from "../types/DTO/signBandInputDTO";

export class BandBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private bandDatabase: BandDatabase,
    private authenticator: Authenticator
  ) {}

  public signBand = async (input: signBandInputDTO): Promise<void> => {
    const { name, music_genre, responsible, token } = input;
    const id: string = this.idGenerator.generateId();
    const userData = this.authenticator.getTokenData(token);

    if (!name || !music_genre || !responsible) {
      throw new Error("Verifique se todos os campos foram preenchidos.");
    }

    //Validação de admin
    if (userData.role !== "ADMIN") {
      throw new Error(
        'O usuário não possui permissão para cadastrar a banda. Apenas usuários com role "admin" podem realizar esta tarefa.'
      );
    }

    const band: Band = new Band(id, name, music_genre, responsible);
    const foundBand: Band = await this.bandDatabase.getBandByName(name);

    if (foundBand) {
      throw new Error("Banda já cadastrada.");
    }

    await this.bandDatabase.signBand(band);
  };

  public getDetails = async (input: GetBandDetailsDTO): Promise<Band> => {
    const { name, id } = input;

    if (!name && !id) {
      throw new Error("Nome e/ou id da banda devem ser informados.");
    }

    if (name && !id) {
      const band = await this.bandDatabase.getBandByName(name);

      if (!band) {
        throw new Error(
          "Não foi possivel encontrar a banda, verifique se o nome e/ou id foram inseridos na query."
        );
      }

      return band;
    }

    if (!name && id) {
      const band = await this.bandDatabase.getBandById(id);

      if (!band) {
        throw new Error(
          "Não foi possivel encontrar a banda, verifique se o nome e/ou id foram inseridos na query."
        );
      }

      return band;
    }

    const band = await this.bandDatabase.getBandById(id);

    if (!band) {
      throw new Error(
        "Não foi possivel encontrar a banda, verifique se o nome e/ou id foram inseridos na query."
      );
    }

    return band;
  };
}
