import { UserDatabase } from "../data/UserDatabase";
import { User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { loginInputDTO } from "../types/DTO/loginInputDTO";
import { signupInputDTO } from "../types/DTO/signupInputDTO";

export class UserBusiness {
  constructor(
    private userDataBase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}
  public signup = async (input: signupInputDTO): Promise<string> => {
    const { name, email, password, role } = input;
    const id = this.idGenerator.generateId();
    const hashedPassword = await this.hashManager.hash(password);

    //Validação de preenchimento de dados
    if (!email || !name || !password || !role) {
      throw new Error("Preencha todos os campos.");
    }

    //Validação de uso de email único
    const foundUser = await this.userDataBase.getUserByEmail(email);
    if (foundUser) {
      throw new Error("Email já cadastrado.");
    }

    const user = new User(id, name, email, hashedPassword, role);

    await this.userDataBase.signup(user);

    const token: string = this.authenticator.generate({ id });

    return token;
  };
}