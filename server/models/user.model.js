// ================================================================================
//                                   Model Statements
// ================================================================================

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: string,
      required: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
    },
    password: {
      type: string,
      required: true,
    },
    credits: {
      type: number,
      default: 50,
      min: 0,
    },
    isCreditAvailable: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Note",
      default: [],
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", userSchema);
