// const { z } = require("zod");

// module.exports = {
//   validateStaffData: async (data) => {
//     const { z } = require("zod");

//     const addressSchema = z.object({
//       street: z.string().optional(),
//       city: z.string().optional(),
//       state: z.string().optional(),
//       postalCode: z.string().optional(),
//       country: z.string().optional(),
//     });

//     const idProofSchema = z.object({
//       idType: z.enum([
//         "aadhar",
//         "pan",
//         "passport",
//         "driving license",
//         "voter id",
//       ]),
//       idNumber: z.string().min(1).toUpperCase(),
//     });

//     const documentURLSchema = z.object({
//       idProof: z.string().url().optional(),
//       pcc: z.string().url().optional(),
//       medicalCertificate: z.string().url().optional(),
//     });

//     const staffBankDetailsSchema = z.object({
//       bankName: z.string(),
//       accountNumber: z.string(),
//       ifsc: z.string(),
//     });

//     const staffValidationSchema = z.object({
//       firstName: z.string().trim().min(1),
//       lastName: z.string().trim().min(1),
//       gender: z.enum(["male", "female", "other"]),
//       phoneNumber: z.string().regex(/^[0-9]{10,15}$/),
//       password: z.string().trim().min(1),
//       address: addressSchema.optional(),
//       idProof: idProofSchema,
//       status: z.boolean().optional(), // Optional since Mongoose will default to `true`
//       documentURL: documentURLSchema,
//       staffBankDetails: staffBankDetailsSchema,
//     });

//     module.exports = { validateStaffData };
//   },
// };

const { z } = require("zod");

// Address schema
const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

// ID Proof schema
const idProofSchema = z.object({
  idType: z.enum(["aadhar", "pan", "passport", "driving license", "voter id"]),
  idNumber: z.string().min(1).toUpperCase(),
});

// Document file object schema
const documentObjectSchema = z.object({
  originalName: z.string().optional(),
  viewLink: z.string().url().optional(),
  downloadLink: z.string().url().optional(),
});

// Documents schema
const documentURLSchema = z.object({
  profileImage: documentObjectSchema.optional().nullable(),
  idProof: documentObjectSchema.optional().nullable(),
  pcc: documentObjectSchema.optional().nullable(),
  medicalCertificate: documentObjectSchema.optional().nullable(),
});

//bankDocumentSchema

const bankDocumentObjectSchema = z.object({
  originalName: z.string().optional(),
  viewLink: z.string().url().optional(),
  downloadLink: z.string().url().optional(),
});

// Bank details schema
const staffBankDetailsSchema = z.object({
  bankName: z.string(),
  accountNumber: z.string(),
  ifsc: z.string(),
  bankDocument:bankDocumentObjectSchema.optional().nullable(),

});

// Main validation schema
const staffValidationSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  gender: z.enum(["male", "female", "other"]),
  phoneNumber: z.string().regex(/^[0-9]{10,15}$/),
  email: z.string().email(),
  password: z.string().trim().min(1),
  address: addressSchema.optional(),
  idProof: idProofSchema,
  status: z.boolean().optional(),
  documentURL: documentURLSchema,
  staffBankDetails: staffBankDetailsSchema,
});

// Validation function
const validateStaffData = async (
  {
  firstName,lastName,gender,phoneNumber,email,password,street,city,state,
  postalCode,country,idType,idNumber,bankName,accountNumber,ifsc,profileImage,
  idProof,pcc,medicalCertificate,bankDocument
}) => {
  const data = {
    firstName,
    lastName,
    gender,
    phoneNumber,
    email,
    password,
    address: {
      street,
      city,
      state,
      postalCode,
      country,
    },
    idProof: {
      idType,
      idNumber,
    },
    documentURL: {
      profileImage,
      idProof,
      pcc,
      medicalCertificate,
    },
    staffBankDetails: {
      bankName,
      accountNumber,
      ifsc,
      bankDocument,
    },
  };

  return staffValidationSchema.parseAsync(data);
};

module.exports = { validateStaffData };
