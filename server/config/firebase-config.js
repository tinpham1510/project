var admin = require('firebase-admin');
var serviceAccount = require('../private_key/database-50d05-firebase-adminsdk-koijb-c708d40ab1.json');
var firebase_app = require("firebase/app");

const FieldValue = admin.firestore.FieldValue;

require('firebase/storage');
require("firebase/auth");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
admin.firestore().settings({ ignoreUndefinedProperties: true });
var firebaseConfig = {
    apiKey: "AIzaSyBOOh4gphCDBBvdPWBpkW5qDh3FfKbk_-I",
    authDomain: "database-50d05.firebaseapp.com",
    projectId: "database-50d05",
    storageBucket: "database-50d05.appspot.com",
    messagingSenderId: "146990117017",
    appId: "1:146990117017:web:16d360dfe45ae92b414808",
    measurementId: "G-HBKH0SD6C5"
};
// Initialize Firebase
firebase_app.initializeApp(firebaseConfig);
module.exports = { db: admin.firestore(), auth: admin.auth(), firebaseApp: firebase_app.default, FieldValue };