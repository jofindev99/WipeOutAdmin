const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const inventorySchema = new Schema({
  itemName: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true,default:0 },
  unit: { type: String }, // liters, pieces, kg, etc.
  reorderLevel: { type: Number, default: 0 }, // Alert if stock below this
  isActive:{type:Boolean,default:true},
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const inventoryModel = model("Inventory", inventorySchema);
module.exports = { inventoryModel };
