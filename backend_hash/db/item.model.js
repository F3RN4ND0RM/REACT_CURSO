import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    price: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
