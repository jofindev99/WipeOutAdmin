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

        type:String,required:true,unique:true,index:true

    },

    phoneNumber:{

        type:String,required:true,unique:true,index:true

    },

    password:{

        type: String,required: true,trim: true

    }

})



const adminModel=model("admin",adminSchema,"admin")

module.exports={adminModel}
    