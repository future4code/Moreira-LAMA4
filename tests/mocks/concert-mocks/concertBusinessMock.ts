import { ConcertBusiness } from "../../../src/business/ConcertBusiness";
import { AuthenticatorMock } from "../AuthenticatorMock";
import { BandDatabaseMock } from "../band-mocks/BandDatabaseMock";
import { IdGeneratorMock } from "../IdGeneratorMock";
import { ConcertDatabaseMock } from "./ConcertDatabaseMock";

export const concertBusiness = new ConcertBusiness(
  new ConcertDatabaseMock() as any,
  new BandDatabaseMock() as any,
  new IdGeneratorMock(),
  new AuthenticatorMock()
);
