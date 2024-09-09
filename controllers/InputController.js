const Input = require('../models/Input');

const all = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const inputs = await Input.find();
            res.status(200).json(inputs);
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
            const input = await Input.findOne({ _id: req.params.id });
            res.status(200).json(input);
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
            const input = new Input(req.body);
            await input.save();
        } else {
            res.status(500).json({
                code: 500,
                message: 'User not found'
            })
        };
        res.status(201).json({
            code: 'OK',
            message: 'Input creado correctamente'
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
            const input = await Input.findOne({ _id: req.params.id });

            if (input) {
                input.name = req.body.name;
                input.type = req.body.type;
                input.required = req.body.required;
                input.maxCant = req.body.maxCant;
                input.minCant = req.body.minCant;
                input.validation = req.body.validation;
                input.actor = req.body.actor;
                await input.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Input actualizado correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'INPUT_NO_EXIST',
                    message: 'El input no existe.'
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
            const input = await Input.findOne({ _id: req.params.id });

            if (input) {
                await input.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Input eliminado correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'INPUT_NO_EXIST',
                    message: 'El input no existe'
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