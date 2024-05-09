import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { InputLoginDTO, OutputLoginDTO} from "../dto/login-dto";
import { GuestRepository } from "../repositories/guest-repository";

// quando colocar a tipagem de retorno em uma fução que tem um async 
// a tipagem tem que ser :Promise<"colocar a tipagem que quer">

export class AuthService {

    constructor(private guestRepository: GuestRepository){}
    
    async login(params: InputLoginDTO): Promise<OutputLoginDTO>{
      
      // <-------------------------- BUSCAR USUARIO POR EMAIL -------------------> 
       const guest = await this.guestRepository.getByEmail(params.email)
       if(!guest){
         throw new Error("e-mail/password invalid")
       }
        //<------------------------ COMPARAR TOKEN -------------------> 
       const passwordValid = await bcrypt.compare(params.password, guest.password as string)
       if (!passwordValid){
        throw new Error ("e-mail/password invalid!")
       }

       // < ---------------------------------- GERAR TOKEM --------------------------->
       const token = jwt.sign(
        {id: guest.id},
        process.env.SECRET_KEY as string,
        {expiresIn:"25min"}
      )

     return {token}

  }  

}