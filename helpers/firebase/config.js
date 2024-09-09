var admin = require("firebase-admin");
var serviceAccount = require("./tustramitesvip-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin
