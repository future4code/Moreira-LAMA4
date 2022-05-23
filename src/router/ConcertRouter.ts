import express from "express";
import { ConcertBusiness } from "../business/ConcertBusiness";
import { ConcertController } from "../controller/ConcertController";
import { BandDatabase } from "../data/BandDatabase";
import { ConcertDatabase } from "../data/ConcertDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const concertRouter = express.Router();
const concertBusiness = new ConcertBusiness(
  new ConcertDatabase(),
  new BandDatabase(),
  new IdGenerator(),
  new Authenticator()
);

const concertController = new ConcertController(concertBusiness);

concertRouter.post("/register", concertController.registerConcert);
concertRouter.get("/search", concertController.getConcertsByDay);
