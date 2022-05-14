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

    //Validação de email
    if (email.indexOf("@") === -1) {
      throw new Error("Email inválido.");
    }

    //Validação de senha
    if (password.length < 6) {
      throw new Error("Sua senha deve ter ao menos 6 caracteres.");
    }

    //Validação de role
    if (role.toLowerCase() !== "admin" && role.toLowerCase() !== "normal") {
      throw new Error("Preencha o campo 'role' com 'admin' ou 'normal'.");
    }

    //Validação de uso de email único
    const foundUser = await this.userDataBase.getUserByEmail(email);
    if (foundUser) {
      throw new Error("Email já cadastrado.");
    }

    const user = new User(id, name, email, hashedPassword, role);

    await this.userDataBase.signup(user);

    const token: string = this.authenticator.generate({ id, role });

    return token;
  };

  public login = async (input: loginInputDTO): Promise<string> => {
    const {email, password} = input;

    // validação de preenchimento de dados
    if (!email || !password) {
      throw new Error('Verifique se todos os campos foram preenchidos.');
    }

    const foundUser = await this.userDataBase.getUserByEmail(email);

    // validação de email
    if (!foundUser) {
      throw new Error('Email não cadastrado.');
    }

    // validação de senha
    const isValid: boolean = await this.hashManager.compare(password, foundUser.password); 

    if (!isValid) {
      throw new Error('Senha e/ou email inválidos.');
    }

    const id: string = foundUser.id;
    const role: string = foundUser.role
     const token: string = this.authenticator.generate({id, role});

     return token;
  };
}
