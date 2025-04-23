const mongoose=require('mongoose')

const {model,Schema}=mongoose;

const invoiceNoSchema= new Schema({
    invoiceName:{type:String,default:"WOS"},
    
    value: { type: Number, default: 100001 },
})
const invoiceNoModal=model('invoiceNo',invoiceNoSchema)

module.exports={invoiceNoModal}