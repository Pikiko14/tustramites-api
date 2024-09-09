const Actor = require('../models/Actor');

const all = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {

            const actors = await Actor.find();
            res.status(200).json(actors);
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
            const actor = await Actor.findOne({ _id: req.params.id });
            res.status(200).json(actor);
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
            const actor = new Actor(req.body);
            await actor.save();
            res.status(201).json({
                code: 'OK',
                message: 'Actor creado correctamente'
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
            const actor = await Actor.findOne({ _id: req.params.id });

            if (actor) {
                actor.name = req.body.name;
                await actor.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Actor actualizado correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'ACTOR_NO_EXIST',
                    message: 'El actor no existe.'
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
            const actor = await Actor.findOne({ _id: req.params.id });

            if (actor) {
                await actor.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Actor eliminado correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'ACTOR_NO_EXIST',
                    message: 'El actor no existe'
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