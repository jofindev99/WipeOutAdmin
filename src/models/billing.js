const mongoose = require("mongoose");
const { Schema, model, Type } = mongoose;

const { invoiceNoModal } = require("./invoiceCounter");

const ServiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true }, // e.g., "Full Interior Cleaning"
  price: { type: Number, required: true },
});

const billingSchema = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    customerName: { type: String },
    customerPhone: { type: String },
    customerEmail: { type: String },
    vehicleNumber: { type: String, required: true },
    vehicleDetails:{
        vehicleType:{
            type:String,
            enum:['2 Wheeler,3 wheeler, 4 wheeler,']
        },
        vehicleName:{
            type:String// example : maruthi breeza
        }


    },

    serviceItems: [ServiceItemSchema],
    totalAmount: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },

    appliedCoupon: {
      code: { type: String },
      discountType: { type: String, enum: ["percentage", "flat"] },
      discountValue: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      couponId: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    },

    grandTotal: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Partially Paid"],
      default: "Unpaid",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

billingSchema.pre("save", async function (next) {
  if (!this.invoiceNumber) {
    const counter = await invoiceNoModal.findOneAndUpdate(
      { name: "WOS" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    counter.year = new Date().getFullYear();

    this.invoiceNumber = `INV-${counter.year}-${counter.value}`;
  }
  next();
});

const CouponModel = model("Billing", billingSchema);

module.exports={CouponModel}
