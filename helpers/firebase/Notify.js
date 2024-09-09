var firebase = require("./config");

module.exports = {
    send(title, message, token) {
        var payload = {
            notification: {
                title: title,
                body: message,
            }
        };
        
        var options = {
            priority: "high",
            timeToLive: 60 * 60 *24
        };
    
        firebase.messaging().sendToDevice(token, payload, options)
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
    }
}