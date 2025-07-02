var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const csvFilePath = './C:\Users\Jeani\OneDrive\Documents\firebase-importer';
