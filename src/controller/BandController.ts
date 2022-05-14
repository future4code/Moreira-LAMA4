import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { GetBandDetailsDTO } from "../types/DTO/GetBandDetailsDTO";
import { signBandInputDTO } from "../types/DTO/signBandInputDTO";

export class BandController {
    constructor(
       private bandBusiness: BandBusiness,
    ){};

    public signBand = async (req: Request, res: Response): Promise<void> => {
        try {
            const {name, music_genre, responsible} = req.body;
            const input: signBandInputDTO = {
                name,
                music_genre,
                responsible
            }

            await this.bandBusiness.signBand(input);
            res.status(200).send('Banda cadastrada com sucesso, tenham um bom show');
        } 
        catch (error: any) {
            switch (error.message) {
                case 'Verifique se todos os campos foram preenchidos':
                    res.status(401).send(error.message);
                    break;
                case 'Banda já cadastrada':
                    res.status(400).send(error.message);
                    break;
                case 'O usuário não possui permissão para cadastrar a banda, apenas usuários com role "admin" podem realizar esta tarefa':
                    res.status(400).send(error.message);
                    break;
                case 'Erro na conexão com o banco de dados':
                    res.status(500).send(error.message);
                    break;
            
                default:
                    res.status(500).send('Erro por parte do servidor');
                    break;
            }    
        }
    };

    public getDetails = async (req: Request, res: Response): Promise<void> => {
        try {
            const name: string = req.query.name as string;
            const id: string = req.query.id as string;
            const input: GetBandDetailsDTO = {name, id};

            const band = await this.bandBusiness.getDetails(input);

            res.status(200).send(band);
        } 
        catch (error: any) {
            switch (error.message) {
                case 'Nome e/ou id da banda devem ser informados':
                    res.status(400).send(error.message);
                    break;
                case 'Não foi possivel encontrar a banda, verifique se o nome e/ou id foram inseridos na query':
                    res.status(404).send(error.message);
                    break;
                case 'Erro na conexão com o banco de dados':
                    res.status(500).send(error.message);
                    break;
            
                default:
                    res.status(500).send('Erro por parte do servidor');
                    break;
            }                
        }
    };
};