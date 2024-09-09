const User = require('../models/User');
const Notification = require('../models/Notification');
const Notify = require('../helpers/firebase/Notify');


const list = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const notifications = await Notification.find({ topic: user.id }).sort([['created_at', -1]]);
            res.status(200).json(notifications);
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

const view_update_one = async function (req, res, next) {
    try {
        const { id } = req.params;
        if (id) {

            await Notification.updateMany({ _id: id }, { view: true }, {multi: true});
            res.status(200).json({
                code: 'OK',
                message: 'Se actualizado correctamente'
            });
        } 

        res.status(500).json({
            code: 500,
            message: 'User not found'
        })
        
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const view_update = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {

            await Notification.updateMany({ topic: user.id }, { view: true }, {multi: true});
            res.status(200).json({
                code: 'OK',
                message: 'Se actualizado correctamente'
            });
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

const refreshToken = async function (req, res, next) {
    try {
        const data = req.decode;
        if (data) {
            const { token } = req.body;

            const user = await User.findOne({ _id: data.id });
            user.notification_token = token;
            await user.save();

            res.status(200).json({
                code: 'OK',
                message: 'Token actualizado correctamente'
            });
        }
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}


const create = async function (req, res, next) {
    
    try {
        const { title, message, user } = req.body;

        if(user) {
            const notification = new Notification({
                title: title,
                message: message,
                created_at: new Date(),
                topic: user,
                view: false
            });

            const userOne = await User.findOne({ _id: user });
            Notify.send(title, message, userOne.notification_token);

            await notification.save();

       
            res.status(200).json({ code: "OK", message: "Se creo la notificacion correctamente"});
        } else {
            res.status(400).json({
                code: 'USER_NO_EXIST',
                message: 'El usuario no existe.'
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
        const user = req.decode;

        if(user) {

            const notification = await Notification.findOne({ _id: req.params.id });

            if(notification) {
                await notification.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Notificacion eliminada correctamente'
                });
            }

            res.status(400).json({
                code: 'NOTIFICATION_NO_EXIST',
                message: 'La notificacion no existe por ese id'
            });
        } else {
            res.status(400).json({
                code: 'USER_NO_EXIST',
                message: 'El usuario no existe.'
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
    list,
    refreshToken,
    create,
    view_update,
    view_update_one,
    remove
}