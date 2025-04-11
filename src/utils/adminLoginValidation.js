const validator = require("validator");
const { z } = require("zod");

module.exports = {
  // loginValidator: (data) => {
  //   const { emailId, phoneNumber, password } = data;

  //   if (!validator.isEmail(emailId)) {
  //     throw new Error("Email is not valid");
  //   }

  //   if (
  //     !validator.isStrongPassword(password, {
  //       minLength: 8,
  //       minLowercase: 1,
  //       minUppercase: 1,
  //       minNumbers: 1,
  //       minSymbols: 1,
  //     })
  //   ) {
  //     throw new Error(
  //       "Password must be strong: min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
  //     );
  //   }

  //   if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
  //     throw new Error("Phone number is not valid");
  //   }
  // },

  adminLoginValidator: (data) => {

    const adminLoginSchema = z.object({
      emailId: z
      .string()
      .trim()
      .email({ message: "Invalid email format" }),

      phoneNumber: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, { message: "Invalid Indian phone number" }),
      password: z
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/(?=.*[a-z])/, { message: "Must include a lowercase letter" })
        .regex(/(?=.*[A-Z])/, { message: "Must include an uppercase letter" })
        .regex(/(?=.*\d)/, { message: "Must include a number" })
        .regex(/(?=.*[@$!%*?&])/, {message: "Must include a special character",}),
    });


    const result = adminLoginSchema.safeParse(data);
    if (!result.success) {
      const message = result.error.errors[0].message;
      const error = new Error(message);
      error.status = 400;
      throw error;
    }
    return result.data;
    
  },


};
