import express from 'express';
import { BandBusiness } from '../business/BandBusiness';
import { BandController } from '../controller/BandController';
import { BandDatabase } from '../data/BandDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { IdGenerator } from '../services/IdGenerator';

export const bandRouter = express.Router();
const bandBusiness: BandBusiness = new BandBusiness(
    new IdGenerator,
    new UserDatabase,
    new BandDatabase,
)
const bandController = new BandController(bandBusiness);

bandRouter.post('/sign', bandController.signBand);