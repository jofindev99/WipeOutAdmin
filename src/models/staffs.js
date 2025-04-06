const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    firstName: {type: String,required: true,trim: true},
    lastName: {type: String,required: true,trim: true},
    gender: {type: String,enum: ["male", "female", "other"]},
    phoneNumber: {type: String,required: true,unique: true,match: /^[0-9]{10,15}$/},
    password: {type: String,required: true,trim: true},
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    idProof: {
      idType: {
        type: String,
        required: true,
        enum: ["aadhar", "pan", "passport", "driving license", "voter id"],
      },
      idNumber: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate ID numbers
        uppercase: true,
      },
    },
    status: {
      type: Boolean,
      default: true,
    },

    documentURL: {
      idProof: {
        type: String,
        required: true,
      },
      pcc: {
        type: String,
      },
      medicalCertificate: {
        type: String,
      },
    },

    staffBankDetails: {
      bankName: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
        unique: true,
      },
      ifsc: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const staffModel = mongoose.model("Staffs", staffSchema);

module.exports = { staffModel };
