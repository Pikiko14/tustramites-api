const Callme = require('../models/Callme');
const AditionalConfig = require('../models/AditionalConfig');
const Smtp = require('../helpers/email/Smtp');

const all = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const calls = await Callme.find();
            res.status(200).json(calls);
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
            const call = await Callme.findOne({ _id: req.params.id });
            res.status(200).json(call);
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
        const call = new Callme(req.body);
        await call.save();
        const aditionalConfigs = await AditionalConfig.find({ type: 'notification_email' });
        let emails = []
        if (aditionalConfigs.length > 0) {
            aditionalConfigs.map(item => emails.push(item.value))

            await Smtp.send(
                //"jefon524@gmail.com",
                emails,
                "Solicitud de llamada",
                "call",
                {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    schedule: req.body.schedule,
                    url: process.env.CLIENT_URL+'/policies'
                }
            );
        }

        res.status(201).json({
            code: 'OK',
            message: 'Solicitud de llamada creado correctamente'
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

        const user = req.decode;
        if (user) {

            const call = await Callme.findOne({ _id: req.params.id });

            if (call) {
                call.name = req.body.name;
                call.email = req.body.email;
                call.phone = req.body.phone;
                call.message = req.body.message;
                call.state = req.body.state;
                call.schedule = req.body.schedule;

                await call.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Solicitud de llamada actualizada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'CALLME_NO_EXIST',
                    message: 'Solicitud de llamada no existe.'
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

            const call = await Callme.findOne({ _id: req.params.id });

            if (call) {
                await call.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Solicitud de llamada eliminada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'CALLME_NO_EXIST',
                    message: 'Solicitud de llamada no existe'
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
    remove
}