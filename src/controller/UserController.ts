import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { loginInputDTO } from "../types/DTO/loginInputDTO";
import { signupInputDTO } from "../types/DTO/signupInputDTO";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}
  public signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, role } = req.body;
      const input: signupInputDTO = {
        name,
        email,
        password,
        role,
      };
      const token: string = await this.userBusiness.signup(input);
      res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso!", token: token });
    } catch (error: any) {
      switch (error.message) {
        case "Preencha todos os campos.":
          res.status(422).send(error.message);
          break;
        case "Email inválido.":
          res.status(422).send(error.message);
          break;
        case "Sua senha deve ter ao menos 6 caracteres.":
          res.status(422).send(error.message);
          break;
        case "Preencha o campo 'role' com 'admin' ou 'normal'.":
          res.status(422).send(error.message);
          break;
        case "Email já cadastrado.":
          res.status(422).send(error.message);
          break;
        case "Preencha o campo 'role' com 'admin' ou 'normal'.":
          res.status(422).send(error.message);
          break;
        case "Erro no banco de dados.":
          res.status(500).send(error.message);
          break;
        default:
          res.status(500).send("Erro do servidor.");
      }
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const input: loginInputDTO = {
        email,
        password,
      };
      const token: string = await this.userBusiness.login(input);

      res
        .status(200)
        .send({ message: "Login efetuado com sucesso", token: token });
    } catch (error: any) {
      switch (error.message) {
        case "Email não cadastrado.":
          res.status(401).send(error.message);
          break;
        case "Verifique se todos os campos foram preenchidos.":
          res.status(422).send(error.message);
          break;
        case "Senha e/ou email inválidos.":
          res.status(403).send(error.message);
          break;
        default:
          res.status(500).send("Erro no servidor.");
          break;
      }
    }
  };
}
