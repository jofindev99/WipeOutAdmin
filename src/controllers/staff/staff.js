const { staffModel } = require("../../models/staffs");
const argon2 = require("argon2");
const { NotFoundError, UnauthorizedError } = require("../../utils/customError");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  staffLogin: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;

      const staff = await staffModel.findOne({ phoneNumber: phoneNumber });
      if (!staff) {
        throw new NotFoundError(" staff  not found");
      }

      const matchedPassword = await argon2.verify(staff.password, password);
      if (matchedPassword) {
        const token = jwt.sign({ _id: staff._id }, JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
          httpOnly: true,
          //secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          // domain: ".yourdomain.com", // 👈 domain here
        });

        return res.status(200).json({success: true,message: "Login successful",user: { name: `${staff.firstName} ${" "} ${staff.lastName}` }});

      } else {

        throw new UnauthorizedError("Credentials not matched");
        
      }
    } catch (error) {

      console.error(error);
      return res.status(error.status || 500).json({success: false,message: error.message || "Internal Server Error"});

    }
  },
};
