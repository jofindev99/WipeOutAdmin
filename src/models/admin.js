const mongoose=require('mongoose');
const {Schema,Type,model}=mongoose

const adminSchema= new Schema({

    firstName: {

        type: String,required: true,trim: true

    },

    lastName: {

        type: String,required: true,trim: true
    
    },

    emailId:{

        type:String,required:true,unique:true

    },

    PhoneNumber:{

        type:String,required:true,unique:true,unique: true,match: /^[0-9]{10,15}$/

    },

    password:{

        type: String,required: true,trim: true

    }

})

const adminModel=model("admin",adminSchema)

module.exports={adminModel}
    