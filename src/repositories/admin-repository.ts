import { AdminModel } from "../entities/admin";

export class AdminRepository {
  async getByEmail(email: string) {
    const admin = await AdminModel.findOne({ email });
    return admin;
  }
}
