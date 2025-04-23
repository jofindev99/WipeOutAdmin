// models/customer.model.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  name: String,
  email: String,
  phone: {type:String,required:true},
});

const customerModel = model('Customer', customerSchema);
module.exports={customerModel}
