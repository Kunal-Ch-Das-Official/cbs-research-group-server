/**
 * Master Alumni Database Model
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 15/08/2024
 *
 * Description:
 * This model defines the schema and structure for the master's alumni
 * document in the CBS Research Group's database. It is responsible for
 * creating and managing records of master's alumni, including fields
 * for their academic achievements, research contributions, and contact information.
 *
 * Usage:
 * Use this model to interact with the master's alumni data in the database.
 * It supports operations like creating, reading, updating, and deleting
 * alumni records, facilitating efficient management of alumni information.
 */

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Custom validator function to check for exactly 10 digits
const validatePhoneNumber = function (phone) {
  return /^\d{10}$/.test(phone); // Ensures the phone number is exactly 10 digits
};
const MatersAlumniShema = new Schema(
  {
    alumniName: {
      type: String,
      required: true,
      maxlength: 25,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    profilePicturePublicId: {
      type: String,
      required: true,
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
        message: 'Phone number must be exactly 10 digits.',
      },
    },
    bscDoneFrom: {
      type: String,
      required: true,
    },
    researchGateId: {
      type: String,
      required: true,
    },
    googleScholarId: {
      type: String,
      required: true,
    },
    yearOfPassout: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const mastersAlumniModel = mongoose.model(
  'masters-alumni-info',
  MatersAlumniShema
);
module.exports = mastersAlumniModel;
