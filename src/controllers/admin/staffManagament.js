/* staff management  */
// add new staff details
// edit exixting staff details
// delete existing staff details (soft delete , block and unblock , )

const { staffModel } = require("../../models/staffs");
const { uploadToDrive } = require("../../services/googleDriveService");

module.exports = {

    addNewStaff :async (req, res) => {
        try {
            console.log(req.body)
          const requiredFields = ['idProof', 'pcc', 'medicalCertificate','bankDocument'];
      
          const uploadedFiles = {};
      
          for (const field of requiredFields) {
            const fileArray = req.files[field];
      
            if (!fileArray || fileArray.length === 0) {
              uploadedFiles[field] = {};
              continue;
            }
      
            const file = fileArray[0];
            const result = await uploadToDrive(file);
      
            uploadedFiles[field] = {
              originalName: file.originalname,
              ...result,
            };
          }
      
          console.log("✅ Files uploaded:", uploadedFiles);
      
          return res.status(200).json({
            success: true,
            message: "Files uploaded successfully",
            uploadedFiles,
          });
        } catch (error) {
          console.error("❌ Upload failed:", error);
          return res.status(500).json({
            success: false,
            message: "Upload to Google Drive failed",
          });
        }
      },
      
  
  getAllStaff: async (req, res) => {},
  editExistingStaff: (req, res) => {},
  deleteExistingStaff: (req, res) => {},
};
