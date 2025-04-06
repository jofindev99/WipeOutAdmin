const { adminModel } = require('../../models/admin')
const {loginValidator}=require('../../utils/adminLoginValidation')
const argon2 = require('argon2');

module.exports = {
  adminSignup: async (req, res) => {
    

    try {

      const {firstName,lastName,emailId,phoneNumber,password}=req.body

      // validation of data
      loginValidator({emailId,phoneNumber,password})

      // hashPassword

      const hashedPassword = await argon2.hash(password);

      // admin instance created
      const adminData = {firstName,lastName,emailId,phoneNumber,password:hashedPassword};
      const admin = new adminModel(adminData);
      await admin.save();



      res.status(201).json({ message: 'Admin added successfully' });

    } catch (error) {

      res.status(400).json({ error: error.message || 'Something went wrong' });

    }
  },
};
