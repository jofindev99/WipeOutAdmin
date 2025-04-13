const multer = require("multer");
const stream = require("stream");

const { drive } = require("./googleDrive");
const upload = multer({ storage: multer.memoryStorage() });
const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID;

const uploadFields = upload.fields([
  { name: "idProof", maxCount: 1 },
  { name: "pcc", maxCount: 1 },
  { name: "medicalCertificate", maxCount: 1 },
  { name: "bankDocument", maxCount: 1 }
  
]);



module.exports = { uploadFields };
