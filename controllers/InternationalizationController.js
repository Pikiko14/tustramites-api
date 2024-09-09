const Internationalization = require('../models/Internationalization');

const all = async function (req, res, next) {
    try {
        const lenguages = await Internationalization.find({ state: true });
        res.status(200).json(lenguages);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const allAdmin = async function (req, res, next) {
    try {
        const lenguages = await Internationalization.find();
        res.status(200).json(lenguages);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}


const show = async function (req, res, next) {
    try {
        const lenguages = await Internationalization.findOne({ _id: req.params.id });
        res.status(200).json(lenguages);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const create = async function (req, res, next) {
    try {
        const lenguages = new Internationalization(req.body);
        await lenguages.save();
        res.status(201).json({
            code: 'OK',
            message: 'Lenguaje creado correctamente'
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
        const lenguage = await Internationalization.findOne({ _id: req.params.id });

        if (lenguage) {
            lenguage.name = req.body.name;
            lenguage.state = req.body.state;
            await lenguage.save();
            res.status(200).json({
                code: 'OK',
                message: 'Lenguaje actualizado correctamente'
            });
        } else {
            res.status(400).json({
                code: 'LENGUAGE_NO_EXIST',
                message: 'El lenguaje no existe.'
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
        const lenguage = await Internationalization.findOne({ _id: req.params.id });

        if (lenguage) {
            await lenguage.remove();
            res.status(200).json({
                code: 'OK',
                message: 'Lenguaje eliminado correctamente'
            });
        } else {
            res.status(400).json({
                code: 'LENGUAGE_NO_EXIST',
                message: 'El lenguaje no existe'
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
    allAdmin,
    show,
    create,
    update,
    remove
}