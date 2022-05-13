import express, { Express } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { AddressInfo } from "net";

dotenv.config();

export const app: Express = express();
app.use(express.json());

const server = app.listen(process.env.DB_PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});