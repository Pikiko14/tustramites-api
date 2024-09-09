var jwt = require('jsonwebtoken');
var moment = require('moment');
var io = null;

const Chat = require('../models/Chat');
const User = require('../models/User');

exports.io = function () {
    return io;
};

exports.initialize = function(sio) {
    return io = sio;
};

exports.init = function(){

    io.on('connection', (client) => {

        client.on('join', (data) => {
            console.log(data);
            client.join(data);
        })

        // DESCONECTA USUARIO DE LA ROOM
        client.on('disconnect', () => {
            client.leave(client.decoded);
        })

        client.on('ROOM_JOIN', (room_id) => { 
            client.join(room_id);
        })

        client.on('ROOM_LEAVEL', (room_id) => {
            client.leave(room_id);
        })

        client.on('MESSAGE', async (room, owner_id, dataMessage) => { 

            const chat = await Chat.findOne({room: room});

            let listMessage = [...chat.message];
            listMessage.push({
                content: dataMessage,
                send_at: new Date(),
                owner_id: owner_id
            })

            chat.message = listMessage;
            await chat.save();

            client.to(room).emit('NEW_MESSAGE', chat);
            client.to("ADMIN").emit('NEW_MESSAGE', chat);
                       
        })
    });
}
