const { staffModel } = require("../../models/staffs");
const { validateStaffData } = require("../../utils/staffDataValidator");
const argon2 = require("argon2");
const { handleFileUploads } = require("../../utils/handleFileUploads");

module.exports = {
  addNewStaff: async (req, res) => {
    console.log(req.files);
    
    try {
      const existingStaff = await staffModel.findOne({
        $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
      });

      if (existingStaff) {
        return res.status(409).json({
          success: false,
          message: "Email or Phone number already exists ,",
        });
      }

      const uploadedFiles = await handleFileUploads(req.files);

      const {
        firstName,
        lastName,
        gender,
        phoneNumber,
        email,
        password,
        street,
        city,
        state,
        postalCode,
        country,
        idType,
        idNumber,
        bankName,
        accountNumber,
        ifsc,
      } = req.body;

      const { profileImage, idProof, pcc, medicalCertificate, bankDocument } =
        uploadedFiles;

      const data = {
        firstName,
        lastName,
        gender,
        phoneNumber,
        email,
        password,
        street,
        city,
        state,
        postalCode,
        country,
        idType,
        idNumber,
        bankName,
        accountNumber,
        profileImage,
        ifsc,
        idProof,
        pcc,
        medicalCertificate,
        bankDocument,
      };

      const hashedPassword = await argon2.hash(password);
      data.password = hashedPassword;
      const validatedresult = await validateStaffData(data);

      const staff = new staffModel(validatedresult);
      await staff.save();

      return res.status(201).json({ success: true, message: "staff added  successfully" });
    } catch (error) {

      console.error("Error fetching staff data:", error);
      return res.status(error.status || 500).json({success: false,message: error.message || "Internal Server Error",});

    }
  },

  getAllStaff: async (req, res) => {
    try {
      const allStaffs = await staffModel
        .find()
        .select(
          "-password -staffBankDetails -idProof -documentURL -address -__v -createdAt -updatedAt"
        );

      if (!allStaffs) {

        const error = new Error("User not found");
        error.status = 404;
        throw error;

      } else if (allStaffs.length === 0) {

        const error = new Error("No staff found");
        error.status = 404;
        throw error;
        
      }
      return res.status(200).json({ success: true,data:allStaffs });
    } catch (error) {

      console.error("Error fetching staff data:", error);
      return res.status(error.status || 500).json({success: false,message: error.message || "Internal Server Error",});

    }
  },
  editExistingStaff: async(req, res) => {
    console.log(req.params.id);
     console.log(req.body);
    console.log(req.files,'llll');
      
  },
  deleteExistingStaff: async(req, res) => {
    
    try {

    const {id:staffId}=req.params

    const existingStaff = await staffModel.findOne({_id:staffId})

    if(!existingStaff){

      return res.status(404).json({success:false, message: "Staff not found" });
    }
    if(existingStaff.status){

      await staffModel.findByIdAndUpdate(staffId, { status:false });

      return res.status(200).json({success: true, message:`${existingStaff.firstName} blocked successfully` });

    }else if(!existingStaff.status){

      await staffModel.findByIdAndUpdate(staffId, { status:true });

      return res.status(200).json({success: true, message: `${existingStaff.firstName} unblocked successfully` });

    }
    
    } catch (error) {

      console.error("Error fetching staff data:", error);

      return res.status(error.status || 500).json({success: false,message: error.message || "Internal Server Error",});
      
    } 
  },

  getStaffData:async(req,res)=>{

    try {

      const {id:staffId}=req.params
      
      const staff = await staffModel.findById(staffId).select(
        "-password  -__v -createdAt -updatedAt"
      );

      if(!staff){

        return res.status(404).json({success:false,message:'this staff not found '})

      }

      return res.status(200).json({success:true,data:staff})

    } catch (error) {

      console.error("Error fetching staff data:", error);

      return res.status(error.status || 500).json({success: false,message: error.message || "Internal Server Error",});

    }
  }
};
