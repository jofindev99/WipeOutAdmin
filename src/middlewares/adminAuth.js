const jwt = require("jsonwebtoken");
const { adminModel } = require("../models/admin")
const { NotFoundError } = require("../utils/customError");
const JWT_SECRET=process.env.JWT_SECRET

module.exports = {
  adminAuth: async (req, res, next) => {
    try {
      console.log('hiii');
      
        // Make sure cookies exist
      const { token } = req.cookies 
      console.log(token);
           
      if (!token) {

         res.status(401).json({success: false,message: "Authentication token missing",});

      }

      // Verify token

      const decodedCookieData = jwt.verify(token, JWT_SECRET);
      
      const admin = await adminModel.findById(decodedCookieData._id);
      console.log(admin);
      

      if (!admin) {
        throw new NotFoundError("Admin not found. Please login again.");
      } else {

        // Attach admin to the request object
        req.admin = admin;
        next();        
      }
    } catch (error) {
        // console.error(error.message)
      res.status(error.status || 500).json({success: false, message: error.message || "Internal Server Error" });
    }
  },
};
