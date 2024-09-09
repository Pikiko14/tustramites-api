const Contact = require('../models/Contact');
const { populate } = require('../models/Contact');

const all = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const contacts = await Contact.find();
            res.status(200).json(contacts);
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
            const contact = await Contact.findOne({ _id: req.params.id });
            res.status(200).json(contact);
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
        console.log(req.body);

        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({
            code: 'OK',
            message: 'Contacto creado correctamente'
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
            const contact = await Contact.findOne({ _id: req.params.id });

            if (contact) {
                contact.name = req.body.name;
                contact.email = req.body.email;
                contact.phone = req.body.phone;
                contact.message = req.body.message;
                contact.state = req.body.state;
                await contact.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Solicitud de contacto actualizada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'CONTACT_NO_EXIST',
                    message: 'Solicitud de contacto no existe.'
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
            const contact = await Contact.findOne({ _id: req.params.id });

            if (contact) {
                await contact.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Solicitud de contacto eliminada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'CONTACT_NO_EXIST',
                    message: 'Solicitud de contacto no existe'
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