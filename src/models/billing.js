const mongoose = require("mongoose");
const { Schema, model, Type } = mongoose;

const { invoiceNoModal } = require("./invoiceCounter");

const ServiceItemSchema = new mongoose.Schema({
  serviceName: { type: String, required: true }, // e.g., "Full Interior Cleaning"
  price: { type: Number, required: true },
});

const billingSchema = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    customerName: { type: String },
    customerPhone: { type: String ,required: true},
    customerEmail: { type: String },
    vehicleNumber: { type: String, required: true },
    vehicleDetails:{
        vehicleType:{
            type:String,
            enum:["2 Wheeler","3 wheeler","4 wheeler",]
        },
        vehicleName:{
            type:String// example : maruthi breeza
        }


    },

    serviceItems: [ServiceItemSchema],
    totalAmount: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },

    appliedCoupon: {
      
      couponId: { type: mongoose.Schema.Types.ObjectId,default:null, ref:"Coupon"},
    },
    discount:{ type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "pending","cancelled"],
      default: "pending",
    },
    notes: { type: String },
    billingStaff:{ type: mongoose.Schema.Types.ObjectId, ref: "Staffs" },
  },
  { timestamps: true }
);

billingSchema.pre("validate", async function (next) {
  if (!this.invoiceNumber) {
    const counter = await invoiceNoModal.findOneAndUpdate(
      { invoiceName: "WOS" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    counter.year = new Date().getFullYear();
    const invoiceSeq = counter.value;

    this.invoiceNumber = `INV-${counter.invoiceName}-${counter.year}-${invoiceSeq}`;
  }
  next();
});

const billingModel = model("Billing", billingSchema);

module.exports={billingModel}
