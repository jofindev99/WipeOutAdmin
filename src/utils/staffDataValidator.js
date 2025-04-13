const { z } = require("zod");

module.exports = {
  validateStaffData: (data) => {
    const { z } = require("zod");

    const addressSchema = z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
    });

    const idProofSchema = z.object({
      idType: z.enum([
        "aadhar",
        "pan",
        "passport",
        "driving license",
        "voter id",
      ]),
      idNumber: z.string().min(1).toUpperCase(),
    });

    const documentURLSchema = z.object({
      idProof: z.string().url(),
      pcc: z.string().url().optional(),
      medicalCertificate: z.string().url().optional(),
    });

    const staffBankDetailsSchema = z.object({
      bankName: z.string(),
      accountNumber: z.string(),
      ifsc: z.string(),
    });

    const staffValidationSchema = z.object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
      gender: z.enum(["male", "female", "other"]),
      phoneNumber: z.string().regex(/^[0-9]{10,15}$/),
      password: z.string().trim().min(1),
      address: addressSchema.optional(),
      idProof: idProofSchema,
      status: z.boolean().optional(), // Optional since Mongoose will default to `true`
      documentURL: documentURLSchema,
      staffBankDetails: staffBankDetailsSchema,
    });

    module.exports = { staffValidationSchema };
  },
};
