// const mongoose = require("mongoose");

// const staffSchema = new mongoose.Schema(
//   {
//     firstName: {type: String,required: true,trim: true},
//     lastName: {type: String,required: true,trim: true},
//     gender: {type: String,enum: ["male", "female", "other"]},
//     phoneNumber: {type: String,required: true,unique: true,match: /^[0-9]{10,15}$/},
//     email:{type:String,required:true,unique:true},
//     password: {type: String,required: true,trim: true},
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       postalCode: String,
//       country: String,
//     },
//     idProof: {
//       idType: {
//         type: String,
//         required: true,
//         enum: ["aadhar", "pan", "passport", "driving license", "voter id"],
//       },
//       idNumber: {
//         type: String,
//         required: true,
//         unique: true, // Ensures no duplicate ID numbers
//         uppercase: true,
//       },
//     },
//     status: {
//       type: Boolean,
//       default: true,
//     },

//     documentURL: {
//       profileImage:{
//         type:String,
//       },
//       idProof: {
//         type: String,
//         required: true,
//       },
//       pcc: {
//         type: String,
//       },
//       medicalCertificate: {
//         type: String,
//       },
//     },

//     staffBankDetails: {
//       bankName: {
//         type: String,
//         required: true,
//       },
//       accountNumber: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//       ifsc: {
//         type: String,
//         required: true,
//       },
//       bankDocument:{
//         type:String


//       }
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const staffModel = mongoose.model("Staffs", staffSchema);

// module.exports = { staffModel };












const mongoose = require("mongoose");

const addressSchema =  ({
  street: { type: String, trim: true, required: false },
  city: { type: String, trim: true, required: false },
  state: { type: String, trim: true, required: false },
  postalCode: { type: String, trim: true, required: false },
  country: { type: String, trim: true, required: false },
});

const idProofSchema = ({
  idType: {
    type: String,
    required: true,
    enum: ["aadhar", "pan", "passport", "driving license", "voter id"],
  },
  idNumber: { type: String, required: true, uppercase: true },
});

const documentObjectSchema =({
  originalName: { type: String, required: false },
  viewLink: { type: String, required: false, match: /^(http|https):\/\/[^ "]+$/ },
  downloadLink: { type: String, required: false, match: /^(http|https):\/\/[^ "]+$/ },
});

const documentURLSchema =({
  profileImage: documentObjectSchema,
  idProof: { type: documentObjectSchema, required: false },
  pcc: { type: documentObjectSchema, required: false },
  medicalCertificate: { type: documentObjectSchema, required: false },
});

const bankDocumentObjectSchema = ({
  originalName: { type: String, required: false },
  viewLink: { type: String, required: false, match: /^(http|https):\/\/[^ "]+$/ },
  downloadLink: { type: String, required: false, match: /^(http|https):\/\/[^ "]+$/ },
});

const staffBankDetailsSchema =({
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  ifsc: { type: String, required: true },
  bankDocument: bankDocumentObjectSchema,
});

const staffSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  phoneNumber: { type: String, required: true, unique: true, match: /^[0-9]{10,15}$/ },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  address: addressSchema,
  idProof: idProofSchema,
  status: { type: Boolean, default: true },
  documentURL: documentURLSchema,
  staffBankDetails: staffBankDetailsSchema,
}, { timestamps: true });

const staffModel = mongoose.model("Staffs", staffSchema);

module.exports = { staffModel };

