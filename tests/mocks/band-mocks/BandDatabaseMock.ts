import { Band } from "../../../src/model/Band";
import { bandMock } from "./bandMock";

export class BandDatabaseMock {
  public signBand = async (band: Band): Promise<void> => {};

  public getBandByName = async (name: string): Promise<Band | undefined> => {
    if (name === "nome mockado") {
      return bandMock;
    } else {
      return undefined;
    }
  };

  public getBandById = async (id: string): Promise<Band | undefined> => {
    if (id === "id mockado") {
      return bandMock;
    } else {
      return undefined;
    }
  };
}
