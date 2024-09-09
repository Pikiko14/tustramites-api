const Chat = require('../models/Chat');
const socket = require('../helpers/socket')

const all = async function (req, res, next) {
    try {
        const chats = await Chat.find();
        res.status(200).json(chats);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const show = async function (req, res, next) {
    try {
        const chat = await Chat.findOne({ room: req.params.id });
        res.status(200).json(chat);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const create = async function (req, res, next) {
    try {
        let listMessage = [], chats = 0, room = 0;

        do {
           room =  Math.random().toString(36).substring(2);  
           chats = await Chat.find({room});
        } while (chats.length!=0);

        listMessage.push({
            content: req.body.message,
            send_at: new Date(),
            owner_id: "CLIENT"
        })
        const data = {...req.body, message: listMessage, room};

        var io = socket.io();
        io.to("ADMIN").emit("ROOM_LIST", data);

        const chat = new Chat(data);
        await chat.save();

        res.status(201).json({
            code: 'OK',
            message: 'Chat creada correctamente',
            data
        });
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const update = async function (req, res, next) {
    try {
        const chat = await Chat.findOne({ _id: req.params.id });

        if (chat) {
            chat.first_name = req.body.first_name;
            chat.last_name = req.body.last_name;
            await chat.save();
            res.status(200).json({
                code: 'OK',
                message: 'Chat actualizada correctamente'
            });
        } else {
            res.status(400).json({
                code: 'CHAT_NO_EXIST',
                message: 'El Chat no existe.'
            });
        }


    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const remove = async function (req, res, next) {
    try {
        const chat = await Chat.findOne({ _id: req.params.id });

        if (chat) {
            await chat.remove();
            res.status(200).json({
                code: 'OK',
                message: 'Chat eliminada correctamente'
            });
        } else {
            res.status(400).json({
                code: 'CHAT_NO_EXIST',
                message: 'El chat no existe'
            });
        }
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

module.exports = {
    all,
    show,
    create,
    update,
    remove
}