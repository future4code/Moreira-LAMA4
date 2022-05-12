import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
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
        role
      };
      const token: string = await this.userBusiness.signup(input);
      res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso!", token: token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
      res.status(500).send("Erro no servidor.");
    }
  };
}