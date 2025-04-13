const path = require('path');
const { google } = require('googleapis');

const KEYFILEPATH = path.join(__dirname,'googleCredentials.json')
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  const drive = google.drive({ version: 'v3', auth });

  module.exports={drive}