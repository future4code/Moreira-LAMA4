import { BaseDatabase } from "./BaseDatabase";

export class Migrations extends BaseDatabase {
  public printError = (error: any) => {
    console.log(error.sqlMessage || error.message);
  };

  public createTables = () =>
    this.connection
      .raw(`
        CREATE TABLE IF NOT EXISTS lama_bands (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          music_genre VARCHAR(255) NOT NULL,
          responsible VARCHAR(255) UNIQUE NOT NULL 
        );
        
        CREATE TABLE IF NOT EXISTS lama_shows (
          id VARCHAR(255) PRIMARY KEY,
          week_day VARCHAR(255) NOT NULL,
          start_time INT NOT NULL,
          end_time INT NOT NULL,
          band_id VARCHAR(255) NOT NULL,
          FOREIGN KEY(band_id) REFERENCES lama_bands(id)
        );
        
        CREATE TABLE IF NOT EXISTS lama_users (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
        )  
      `)
      .then(() => {
        console.log("Tabelas criadas");
      })
      .catch(this.printError);

  public closeConnection = () => {
    this.connection.destroy();
  };
}

const myMigrations = new Migrations();

myMigrations.createTables().finally(myMigrations.closeConnection);
