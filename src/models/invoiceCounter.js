const mongoose=require('mongoose')

const {model,Schema}=mongoose;

const invoiceNoSchema= new Schema({
    invoiceName:{type:String,default:"WOS"},
    
    value:{type:Number,default:10000}
})
const invoiceNoModal=mongoose.model('invoiceNo',invoiceNoSchema)

module.exports={invoiceNoModal}