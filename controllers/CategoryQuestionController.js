const Category = require('../models/CategoryQuestion');

const all = async function (req, res, next) {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const show = async function (req, res, next) {
    try {
        //const category = await Category.findOne({ name: { $regex: req.params.name }  });
        const category = await Category.findOne({ _id:req.params.id});
        res.status(200).json(category);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const create = async function (req, res, next) {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({
            code: 'OK',
            message: 'Categoria creada correctamente'
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
        const category = await Category.findOne({ _id: req.params.id });

        if (category) {
            category.name = req.body.name;
            category.description = req.body.description;
            await category.save();
            res.status(200).json({
                code: 'OK',
                message: 'Categoria actualizada correctamente'
            });
        } else {
            res.status(400).json({
                code: 'CATEGORY_NO_EXIST',
                message: 'La Categoria no existe.'
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
        const category = await Category.findOne({ _id: req.params.id });

        if (category) {
            await category.remove();
            res.status(200).json({
                code: 'OK',
                message: 'Categoria eliminada correctamente'
            });
        } else {
            res.status(400).json({
                code: 'CATEGORY_NO_EXIST',
                message: 'La categoria no existe'
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
    show,
    create,
    update,
    remove
}