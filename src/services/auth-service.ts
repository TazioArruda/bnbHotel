import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { InputLoginDTO, OutputLoginDTO} from "../dto/login-dto";
import { GuestRepository } from "../repositories/guest-repository";

// quando colocar a tipagem de retorno em uma fução que tem um async 
// a tipagem tem que ser :Promise<"colocar a tipagem que quer">

export class AuthService {

    constructor(private guestRepository: GuestRepository){}
    
    async login(params: InputLoginDTO): Promise<OutputLoginDTO>{
       // 1. Buscar o usuário pelo e-mail no bando de dados 
       // 2. Comparar a senha que o usuário enviou com a senha do banco de dados 
       // 3. gerar tokem

       const guest = await this.guestRepository.getByEmail(params.email)
       if(!guest){
         throw new Error("e-mail/password invalid")
       }

       const passwordValid = await bcrypt.compare(params.password, guest.password as string)
       if (passwordValid){
        throw new Error ("e-mail/password invalid!")
       }
    }

}