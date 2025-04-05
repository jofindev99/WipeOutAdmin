const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  description: { type: String },

  discountType: {
    type: String,
    enum: ["percentage", "flat"],
    required: true
  },

  discountValue: { type: Number, required: true }, // 10 for flat, 10% for percentage

  maxDiscount: { type: Number }, // Optional cap (used with percentage)
  minInvoiceAmount: { type: Number, default: 0 }, // Minimum invoice total to apply

  validFrom: { type: Date, required: true },
  validTill: { type: Date, required: true },

  usageLimit: { type: Number, default: 1 }, // How many times this coupon can be used
  usedCount: { type: Number, default: 0 }, // Tracks how many times it's been used

  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Coupon = model("Coupon", couponSchema);
module.exports = { Coupon };
