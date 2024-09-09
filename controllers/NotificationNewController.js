const User = require('../models/User');
const Notification = require('../models/NotificationNew');


const list = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const notifications = await Notification.find({ _to: user.id }).sort([['created_at', -1]]);

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

const getAll = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const notifications = await Notification.find({}).sort([['created_at', -1]]);
            let finalNotifications = [];
            if (req.query.type) {
                let filter = {}
                if (req.query.type == 0)
                    filter["role"] = "CLIENTE"
                if (req.query.type == 1)
                    filter["role"] = "ASESOR LEGAL"

                const users = await User.find(filter);
                notifications.map(notification => {
                    if (users.find(user => user._id == notification._to))
                        finalNotifications.push(notification)
                })
            }
            res.status(200).json(req.query.type ? finalNotifications : notifications);
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
        const user = req.decode;
        if (user) {
            const { id } = req.params;
            if (id) {

                await Notification.updateMany({ _id: id }, { view: true }, { multi: true });
                res.status(200).json({
                    code: 'OK',
                    message: 'Se actualizado correctamente'
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

const view_update = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {

            await Notification.updateMany({ topic: user.id }, { view: true }, { multi: true });
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

const update_notificacion = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const { title, message, created_at, view, _from, _to, text, link } = req.body;
            const notification = await Notification.findOne({ _id: req.params.id });

            if (notification) {
                notification.title = title;
                notification.message = message;
                notification.created_at = created_at;
                notification.view = view;
                notification._from = _from;
                notification._to = _to;
                notification.text = text;
                notification.link = link;
                await notification.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Notificación actualizada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'NOTIFICATION_NO_EXIST',
                    message: 'La Notificación no existe por ese id'
                });
            }

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

const create = async function (req, res, next) {

    try {
        const user = req.decode;
        if (user) {
            const { title, message, created_at, view, _from, _to, text, link } = req.body;

            if (_to == 'asesor_legal') {
                const users = await User.find({ role: "ASESOR LEGAL" });
                for await (element of users) {
                    const notification = new Notification({
                        title: title,
                        message: message,
                        created_at: created_at,
                        view: view,
                        _from: _from,
                        _to: element,
                        text: text,
                        link: link
                    });
                    await notification.save();
                }

            } else {
                const notification = new Notification({
                    title: title,
                    message: message,
                    created_at: created_at,
                    view: view,
                    _from: _from,
                    _to: _to,
                    text: text,
                    link: link
                });
                await notification.save();
            }


            res.status(200).json({ code: "OK", message: "Se creo la notificacion correctamente" });
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

        if (user) {

            const notification = await Notification.findOne({ _id: req.params.id });

            if (notification) {
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
    getAll,
    create,
    view_update,
    view_update_one,
    remove,
    update_notificacion
}