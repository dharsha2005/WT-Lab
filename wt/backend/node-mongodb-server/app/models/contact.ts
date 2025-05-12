import mongoose, { Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  msg: string;
}

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  msg: { type: String, required: true },
  products: [
    {
      birdType: { type: String },
      productType: { type: String },
      quantity: { type: Number },
      pricePerUnit: { type: Number },
      totalValue: { type: Number },
    },
  ],
});

export default mongoose.model<IContact>("Contact", ContactSchema);