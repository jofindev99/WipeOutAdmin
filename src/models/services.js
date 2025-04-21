const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// models/Service.js


const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  duration: String, // e.g., "30 minutes", optional
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: { type: Boolean, default: true }
});

const serviceModel = model('Service', serviceSchema);
module.exports = {serviceModel};
