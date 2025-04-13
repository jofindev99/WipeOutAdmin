const { uploadToDrive } = require("../services/googleDriveService");
// const { uploadToDrive } = require("../../services/googleDriveService");

const handleFileUploads = async (files) => {
    const requiredFields = [
      "profileImage",
      "idProof",
      "pcc",
      "medicalCertificate",
      "bankDocument",
    ];
  
    const uploadedFiles = {};
  
    for (const field of requiredFields) {
      const fileArray = files[field];
      if (!fileArray || fileArray.length === 0) {
        uploadedFiles[field] = null;
        continue;
      }
  
      const file = fileArray[0];
      try {
        const result = await uploadToDrive(file);
        uploadedFiles[field] = {
          originalName: file.originalname,
          ...result,
        };
      } catch (err) {
        throw new Error(`Failed to upload ${field}`);
      }
    }
  
    return uploadedFiles;
  };

  module.exports={handleFileUploads}
  