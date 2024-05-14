import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { InputAdminDTO, OutputAdminDTO } from "../dto/admin-dto";
import { AdminRepository } from "../repositories/admin-repository";


export class AdminAuthService {

    constructor(private adminRepository: AdminRepository){
        this.adminRepository = adminRepository
    }

    async login(params: InputAdminDTO): Promise<OutputAdminDTO> {
        // Busca o administrador por e-mail
        
        const admin = await this.adminRepository.getByEmail(params.email);
        if (!admin) {
            
            throw new Error("E-mail/password invalid");
        }


        // Verifica se a senha está correta
        const passwordValid = await bcrypt.compare(params.password, admin.password as string);
        if (!passwordValid) {
            throw new Error("E-mail/password invalid!");
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: admin._id, isAdmin: true },
            process.env.SECRET_KEY as string,
            { expiresIn: "25min" }
        );

        return { token };
    }
}