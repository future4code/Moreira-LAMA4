import express from "express";
import { ConcertBusiness } from "../business/ConcertBusiness";
import { ConcertController } from "../controller/ConcertController";
import { ConcertDatabase } from "../data/ConcertDatabase";
import { IdGenerator } from "../services/IdGenerator";

export const concertRouter = express.Router();
const concertBusiness = new ConcertBusiness(
  new ConcertDatabase(),
  new IdGenerator()
);

const concertController = new ConcertController(concertBusiness);

concertRouter.post("/register", concertController.registerConcert);
