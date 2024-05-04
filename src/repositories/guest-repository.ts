import { CreateGuestDTO } from "../dto/guest-dto";
import { GuestModel } from "../entities/guest";

export class GuestRepository{
    async getByEmail(email: string){
        console.log(email)
        const guest = await GuestModel.findOne({ email })
        return guest
    }
    
    async create(params: CreateGuestDTO ){
        const guest = await GuestModel.create(params)
        return guest
    }
}