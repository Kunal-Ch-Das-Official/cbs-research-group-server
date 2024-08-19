// Content: Contact Form Database model.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: Role of this model is to create a document object model for contact user to the database.

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Custom validator function to check for exactly 10 digits
const validatePhoneNumber = function (phone) {
  return /^\d{10}$/.test(phone); // Ensures the phone number is exactly 10 digits
};

const ContactUserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 30,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: validatePhoneNumber,
        message: "Phone number must be exactly 10 digits.",
      },
    },
    desireCourse: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const contactFormModel = mongoose.model(
  "received-contact-info",
  ContactUserSchema
);
module.exports = contactFormModel;
