const stream = require('stream');
const { drive } = require('../config/googleDrive');
const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID;

if (!DRIVE_FOLDER_ID) {
  throw new Error('DRIVE_FOLDER_ID is not defined in environment variables');
}

const uploadToDrive = async (file) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);

  try {
    const response = await drive.files.create({
      requestBody: {
        name: file.originalname,
        parents: [DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: file.mimetype,
        body: bufferStream,
      },
      fields: 'id',
    });

    const fileId = response.data.id;

    await setDriveFilePermissions(fileId);

    const { data } = await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink',
    });

    return {
      viewLink: data.webViewLink,
      downloadLink: data.webContentLink,
    };
  } catch (error) {
    console.error(`❌ Error uploading file: ${file.originalname}`, error);
    throw new Error(`Upload failed for ${file.originalname}`);
  }
};

const setDriveFilePermissions = async (fileId) => {
  return await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'writer',
      type: 'anyone',
    },
  });
};
module.exports = { uploadToDrive };