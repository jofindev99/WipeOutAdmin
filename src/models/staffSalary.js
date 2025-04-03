const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const staffSalarySchema = new Schema(
  {
    staffId: {
      type: Types.ObjectId,
      ref: staff,
      required: true,
    },
    salaryHistory: [
      {
        amount: { type: Number, required: true, min: 0 }, // Salary amount
        paymentDate: { type: Date, default: Date.now }, // Date of payment
        paymentStatus: {
          type: String,
          enum: ["Pending", "Paid"],
          default: "Pending",
        }, // Status
        transactionId: { type: String, unique: true }, // Razorpay transaction ID
      },
    ],
  },
  { timestamps: true }
);

const staffSalaryModel = model("staffSalary", staffSalarySchema);
module.exports = { staffSalaryModel };
