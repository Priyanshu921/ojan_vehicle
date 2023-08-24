import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "admin", "driver"],
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
  paymentMethods: [
    { type: mongoose.Schema.Types.ObjectId, ref: "PaymentMethod" },
  ],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
},{timestamps:true});

export const user = mongoose.model('user',userSchema,'user')