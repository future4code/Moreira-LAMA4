import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  protected TABLE_NAME = "lama_users";

  public signup = async (user: User): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole()
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro no banco de dados.");
      }
    }
  };

  public getUserByEmail = async (email: string) => {
    try {
      const [result] = await this.connection(this.TABLE_NAME).where(
        "email",
        email
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

  public getUserById = async (id: string) => {
    try {
      const [result] = await this.connection(this.TABLE_NAME).where(
        "id",
        id
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
}