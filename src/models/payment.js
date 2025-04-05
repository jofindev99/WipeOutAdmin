const mongoose =require('mongoose');
const {Schema,Types,model}=mongoose;



const paymentSchema = new Schema({
    invoiceId: { type: Types.ObjectId, ref: "Billing", required: true }, // Related invoice
    customerId: { type: Types.ObjectId, ref: "Customer", required: true },
    amountPaid: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Cash", "Credit Card", "Bank Transfer", "UPI"], required: true },
    transactionId: { type: String, unique: true, required: true }, // Payment gateway transaction ID
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Success", "Failed", "Pending"], default: "Success" }
}, { timestamps: true });

const Payment = model("Payment", paymentSchema);

module.exports = { Payment };
