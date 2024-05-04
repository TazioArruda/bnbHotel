import { CreateGuestDTO } from "../dto/guest-dto";
import bcrypt from "bcrypt"

// Não permitir o cadastro se um usuário com o mesmo e-mail já existir
// Criptografar a senha antes de armazenar no banco de dados

export class GuestService{

    constructor(private repository: any){}

    async create(params:CreateGuestDTO){
        const thisUserExists = await this.repository.getByEmail(params.email)
        if(thisUserExists){
            throw new Error("registered user")
        }
        
        const payload = {
            ...params,
            password: await bcrypt.hash(params.password, 8)
        }

       const guest = await this.repository.create(payload)

       return guest

    }
}