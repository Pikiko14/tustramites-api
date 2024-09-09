var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Chat = new Schema({
    room: {
        type: String,
        require: true
    },
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String, 
        require: true
    },
    phone: {
        type: String,
        required: true
    },
    user: {
        type: String,
        ref: 'User'
    },
    message: [{
        content: {
            type: String
        },
        send_at: {
            type: Date
        },
        owner_id: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Chat', Chat);
