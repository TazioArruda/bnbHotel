import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, min: 6, max: 8 },
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model("Admin", AdminSchema);
