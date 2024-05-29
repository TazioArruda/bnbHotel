import { CreateGuestDTO } from "../dto/guest-dto";
import bcrypt from "bcrypt";

// Não permitir o cadastro se um usuário com o mesmo e-mail já existir
// Criptografar a senha antes de armazenar no banco de dados

export class GuestService {
  constructor(private repository: any) {}

  // Método assíncrono para criar um novo convidado
  async create(params: CreateGuestDTO) {
     // Verifica se já existe um usuário com o e-mail fornecido
    const thisUserExists = await this.repository.getByEmail(params.email);
    if (thisUserExists) {
      // Se já existir um usuário, lança um erro
      throw new Error("registered user");
    }
     // Cria um payload com os parâmetros recebidos e a senha criptografada
    const payload = {
      ...params,
      password: await bcrypt.hash(params.password, 8),
    };

    // Cria um novo convidado no repositório com o payload
    const guest = await this.repository.create(payload);
    // Retorna o convidado criado
    return guest;
  }
}
