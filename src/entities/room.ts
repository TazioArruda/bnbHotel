import mongoose from "mongoose";

const RomSchema = new mongoose.Schema({

    id: { type: String, required: true },
    number: { type: Number, default:0, required: true },
    type: { type: String, required: true },
    guest_capacity: { type: Number, required: true },
    daily_rate: { type: Number, required: true },
    photo: { type: String, required: true },
    status: { type: String, required: true },


},{timestamps:true})

export const RomModel = mongoose.model("Rom", RomSchema)