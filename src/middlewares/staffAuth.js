const jwt = require("jsonwebtoken");
const { staffModel } = require("../models/staffs")
const { NotFoundError } = require("../utils/customError");
const JWT_SECRET=process.env.JWT_SECRET

module.exports = {
  staffAuth: async (req, res, next) => {
    try {
      
        // Make sure cookies exist

      const { token } = req.cookies;
           
      if (!token) {

         res.status(401).json({success: false,message: "Authentication token missing",});

      }

      // Verify token

      const decodedCookieData = jwt.verify(token, JWT_SECRET);
      
      const staff = await staffModel.findById(decodedCookieData._id);
      

      if (!staff) {
        throw new NotFoundError("staff not found. Please login again.");
      } else {

        // Attach admin to the request object
        req.staff = staff;
        next();        
      }
    } catch (error) {

      res.status(error.status || 500).json({success: false, message: error.message || "Internal Server Error" });

    }
  },
};
