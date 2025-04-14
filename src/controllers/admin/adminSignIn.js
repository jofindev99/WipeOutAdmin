const { adminModel } = require('../../models/admin')
const {loginValidator,adminLoginValidator}=require('../../utils/adminLoginValidation')
const argon2 = require('argon2');
const {NotFoundError,UnauthorizedError}=require('../../utils/customError')
const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET

module.exports = {

  adminLogin:async(req,res)=>{
    try {
      const {emailId,phoneNumber,password}=req.body;

      const admin=await adminModel.findOne({emailId:emailId,phoneNumber:phoneNumber});

      if(!admin){

        throw new NotFoundError(" admin not found");

      }

      const matchedPassword=await argon2.verify(admin.password, password);

      if (matchedPassword){

        const token = jwt.sign({ _id: admin._id }, JWT_SECRET,{expiresIn:"7d"});
        
        res.cookie("token", token, {
          httpOnly: true,
          //secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          // domain: ".yourdomain.com", // 👈 domain here
        });        
        return res.status(200).json({success: true, message: "Login successful",user: { name: `${admin.firstName} ${' '} ${admin.lastName}`}});

      }else{
        throw new UnauthorizedError("Credentials not matched");
      }

      
      
    } catch (error) {

      return res.status(error.status || 500).json({success: false, message: error.message || 'Internal Server Error' });

    }
  },

  
    
    
  

    // adminSignup: async (req, res) => {

  //   try {

  //     const {firstName,lastName,emailId,phoneNumber,password}=req.body

  //     // validation of data
  //     await loginValidator({emailId,phoneNumber,password})
    
  //     // hashPassword

  //     const hashedPassword = await argon2.hash(password);

  //     // admin instance created
  //     const adminData = {firstName,lastName,emailId,phoneNumber,password:hashedPassword};
  //     const admin = new adminModel(adminData);
  //     await admin.save();



  //     res.status(201).json({ message: 'Admin added successfully' });

  //   } catch (error) {

  //     res.status(400).json({ error: error.message || 'Something went wrong' });

  //   }
  // },


};
