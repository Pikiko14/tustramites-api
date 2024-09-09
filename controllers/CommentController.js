const Comment = require('../models/Comment');
const fs = require('fs');
const storage = require('../helpers/storage');

const all = async function (req, res, next) {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
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
            const comment = await Comment.findOne({ _id: req.params.id });
            res.status(200).json(comment);
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
            const files = req.files;
            if (files) {
                storage
                    .save(files.image, 0, 'comment')
                    .then(async (file_storage) => {
                        const filename = file_storage.Location;

                        const data = JSON.parse(req.body.comment);
                        const comment = new Comment({
                            url_image: filename,
                            fullname: data.fullname,
                            position_company: data.position_company,
                            comment: data.comment,
                            state: data.state
                        })

                        await comment.save();
                        res.status(201).json({
                            code: 'OK',
                            message: 'Comentario creado correctamente'
                        });

                    });

            } else {
                res.status(400).json({
                    code: 'IMAGE_NO_EXIST',
                    message: 'Imagen obligatoria'
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
            const comment = await Comment.findOne({ _id: req.params.id });

            if (comment) {
                const files = req.files;
                if (files) {
                    storage
                        .delete(banner.url_image, 0)
                        .then(async (file_delete) => {

                            storage
                                .save(files.image, 0, 'comment')
                                .then(async (file_storage) => {

                                    const data = JSON.parse(req.body.comment);

                                    comment.fullname = data.fullname;
                                    comment.position_company = data.position_company;
                                    comment.comment = data.comment;
                                    comment.state = data.state;
                                    comment.url_image = file_storage.Location,
                                        await comment.save();
                                    res.status(200).json({
                                        code: 'OK',
                                        message: 'Comentario actualizado correctamente'
                                    });
                                })
                        })
                } else {
                    res.status(400).json({
                        code: 'IMAGE_NO_EXIST',
                        message: 'Imagen obligatoria'
                    });
                }
            } else {
                res.status(400).json({
                    code: 'COMMENT_NO_EXIST',
                    message: 'El comentario no existe.'
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
            const comment = await Comment.findOne({ _id: req.params.id });

            if (comment) {

                storage
                .delete(comment.url_image, 0)
                .then(async (_) => {
                    await comment.remove();
                    res.status(200).json({
                        code: 'OK',
                        message: 'Comentario eliminado correctamente'
                    });
                })
                
            } else {
                res.status(400).json({
                    code: 'COMMENT_NO_EXIST',
                    message: 'El comentario no existe'
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