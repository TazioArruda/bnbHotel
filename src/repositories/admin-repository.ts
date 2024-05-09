import { AdminModel } from "../entities/admin";


export class AdminRepository {
  async getByEmail(email: string) {
    console.log(email)
      const admin = await AdminModel.findOne({ email });
      return admin;
  }
};