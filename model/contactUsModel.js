import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      description: "Name of the request person",
      required: true,
    },
    company: {
      type: String,
      description: "Name of the company",
      required: true,
    },
    email: {
      type: String,
      description: "Name of the request person's email",
      required: true,
    },
    subject: {
      type: String,
      description: "Subject of the request",
      required: true,
    },
    phone: {
      type: Number,
      description: "Name of the request person's email",
      required: true
    },
    message: {
      type: String,
      description: "Contact",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "ContactUsModel",
  contactUsSchema
);
