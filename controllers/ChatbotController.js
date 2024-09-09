const Chatbot = require('../models/Chatbot');

const all = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const chatbots = await Chatbot.find();
            res.status(200).json(chatbots);
        } else {
            res.status(500).json({
                code: 500,
                message: 'User not found'
            })
        };
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const allActive = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            let chatbots = await Chatbot.find({ state: true });
            chatbots.map((chatbot) => {
                chatbot.secondLevel = chatbot.secondLevel.filter((item) => item.state == true)
                if (chatbot.secondLevel.length > 0) {
                    chatbot.secondLevel.map((element) => {
                        if (element.sons.length > 0) {
                            element.sons = element.sons.filter((item) => item.state == true)
                        }
                        return element
                    })

                }
                return chatbot
            })
            res.status(200).json(chatbots);
        } else {
            res.status(500).json({
                code: 500,
                message: 'User not found'
            })
        };
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const show = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const chatbot = await Chatbot.findOne({ _id: req.params.id });

            res.status(200).json(chatbot);
        } else {
            res.status(500).json({
                code: 500,
                message: 'User not found'
            })
        };
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const create = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const chatbotFinded = await Chatbot.findOne({ key: req.body.key });
            if (!chatbotFinded) {
                const chatbot = new Chatbot(req.body);
                await chatbot.save();
                res.status(201).json({
                    code: 'OK',
                    message: 'Opción de chatbot creada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'CHATBOT_KEY_EXIST',
                    message: 'Número de la opción del chatbot ya existe.'
                });
            }
        } else {
            res.status(500).json({
                code: 500,
                message: 'User not found'
            })
        };
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const update = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const chatbot = await Chatbot.findOne({ _id: req.params.id });

            if (chatbot) {
                chatbot.key = req.body.key;
                chatbot.title = req.body.title;
                chatbot.description = req.body.description;
                chatbot.secondLevel = req.body.secondLevel;
                chatbot.whatsapp = req.body.whatsapp;
                chatbot.state = req.body.state;

                await chatbot.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Opción del chatbot actualizada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'CHATBOT_NO_EXIST',
                    message: 'Opción del chatbot no existe.'
                });
            }
        } else {
            res.status(500).json({
                code: 500,
                message: 'User not found'
            })
        };
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const remove = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const chatbot = await Chatbot.findOne({ _id: req.params.id });

            if (chatbot) {
                await chatbot.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Opción del chatbot eliminada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'CHATBOT_NO_EXIST',
                    message: 'Opción del chatbot no existe'
                });
            }
        } else {
            res.status(500).json({
                code: 500,
                message: 'User not found'
            })
        };
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
    remove,
    allActive
}