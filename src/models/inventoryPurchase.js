const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const purchaseItemSchema = new Schema({
  itemName: { type: String, required: true },         // "Washing Liquid"
  quantity: { type: Number, required: true },         // 10
  unit: { type: String },                             // "liters", "pieces"
  unitPrice: { type: Number, required: true },        // 50
  totalPrice: { type: Number, required: true },       // quantity * unitPrice
});

const inventoryPurchaseSchema = new Schema({
  purchaseDate: { type: Date, default: Date.now },
  supplierName: { type: String },                     
  invoiceNumber: { type: String, unique: true },      
  items: [purchaseItemSchema],                        // Array of purchased items
  totalAmount: { type: Number, required: true },      // Auto-calculated
  paymentMethod: {
    type: String,
    enum: ["Cash", "UPI", "Card", "Bank Transfer", "Credit"],
    default: "Cash"
  },
  notes: { type: String }
}, { timestamps: true });

const InventoryPurchase = model("InventoryPurchase", inventoryPurchaseSchema);

module.exports = { InventoryPurchase };
