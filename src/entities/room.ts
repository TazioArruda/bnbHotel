import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    number: { type: Number, default: 0, required: true },
    type: { type: String, required: true },
    guest_capacity: { type: Number, required: true },
    daily_rate: { type: Number, required: true },
    photo: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const RoomModel = mongoose.model("Rom", RoomSchema);
