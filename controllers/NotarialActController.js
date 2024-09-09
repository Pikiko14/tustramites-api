const NotarialAct = require('../models/NotarialAct');
const { populate } = require('../models/NotarialAct');

const all = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const notarialActs = await NotarialAct.find()
                .populate("category")
                .populate("page");

            res.status(200).json(notarialActs);
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
            const notarialAct = await NotarialAct.findOne({ _id: req.params.id })
                .populate("category")
                .populate("page");

            res.status(200).json(notarialAct);
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

const showFromCategory = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const notarialActs = await NotarialAct.find({ category: req.params.id })
                .populate("category")
                .populate("page");
            if (req.headers.origin == process.env.CLIENT_URL || req.headers.origin == "https://portal.tustramitesvip.com/") {
                notarialActs.splice(0, 0, { name: 'Selecciona el tipo de trámite', _id: '0' })
            }
            res.status(200).json(notarialActs);
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
            const notarialAct = new NotarialAct(req.body);
            await notarialAct.save();
            res.status(201).json({
                code: 'OK',
                message: 'Acto notarial creado correctamente'
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

const update = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const notarialAct = await NotarialAct.findOne({ _id: req.params.id });

            if (notarialAct) {
                notarialAct.name = req.body.name;
                notarialAct.description = req.body.description;
                notarialAct.category = req.body.category;
                notarialAct.actors = req.body.actors;
                notarialAct.form = req.body.form;
                notarialAct.documents = req.body.documents;
                notarialAct.notary = req.body.notary;
                notarialAct.payment = req.body.payment;
                notarialAct.document_result = req.body.document_result ? req.body.document_result : '';
                notarialAct.date = req.body.date;
                notarialAct.time_delivery = req.body.time_delivery;
                notarialAct.duration = req.body.duration;
                notarialAct.note = req.body.note;
                notarialAct.note_2 = req.body.note_2;
                notarialAct.page = req.body.page;

                await notarialAct.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Acto notarial actualizado correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'NOTARIAL_ACT_NO_EXIST',
                    message: 'Acto notarial no existe.'
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
            const notarialAct = await NotarialAct.findOne({ _id: req.params.id });

            if (notarialAct) {
                await notarialAct.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Acto notarial eliminado correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'NOTARIAL_ACT_NO_EXIST',
                    message: 'Acto notarial no existe'
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
    showFromCategory,
    create,
    update,
    remove
}