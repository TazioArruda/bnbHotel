import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema ({
    checkin_date: { type: Date, required: true },
    checkout_date: { type: Date, required: true },
    guests: { type: Number, required: true },
    id_room: { type: Number, required: true },
    id_guest: { type: Number, required: true },
    status: { type: String, default: "pending", required: true }
},{timestamps:true})

export const BookingModel = mongoose.model("Booking", BookingSchema)

