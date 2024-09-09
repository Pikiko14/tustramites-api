const Page = require('../models/Page');

const all = async function (req, res, next) {
    try {
        const pages = await Page.find();
        res.status(200).json(pages);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const show = async function (req, res, next) {
    try {
        const page = await Page.findOne({ _id: req.params.id });
        res.status(200).json(page);
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
            var page = new Page(req.body);
            const url = page.url.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ /g, "-");
            page.url = url;
            await page.save();
            res.status(201).json({
                code: 'OK',
                message: 'Pagina creada correctamente'
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
            const page = await Page.findOne({ _id: req.params.id });

            if (page) {
                page.url = req.body.url.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ /g, "-");
                page.content = req.body.content;
                page.title = req.body.title;
                await page.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Pagina actualizada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'PAGE_NO_EXIST',
                    message: 'La pagina no existe por ese id'
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
            const page = await Page.findOne({ _id: req.params.id });

            if (page) {
                await page.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Pagina eliminada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'PAGE_NO_EXIST',
                    message: 'La pagina no existe por ese id'
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