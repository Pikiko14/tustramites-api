const SubCategory = require('../models/SubCategoryQuestion');
const { populate } = require('../models/SubCategoryQuestion');

const all = async function (req, res, next) {
    try {
        const subcategories = await SubCategory.find()
            .populate("category");
        res.status(200).json(subcategories);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const show = async function (req, res, next) {
    try {
        //const subcategory = await SubCategory.findOne({ name: { $regex: req.params.name } });
        const subcategory = await SubCategory.findOne({ _id: req.params.id})
        .populate("category");

        res.status(200).json(subcategory);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const create = async function (req, res, next) {
    try {
        const subcategory = new SubCategory(req.body);
        await subcategory.save();
        res.status(201).json({
            code: 'OK',
            message: 'Subcategoria creada correctamente'
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
        const subcategory = await SubCategory.findOne({ _id: req.params.id });

        if (subcategory) {
            subcategory.name = req.body.name;
            subcategory.caegory=req.body.category;

            await subcategory.save();
            res.status(200).json({
                code: 'OK',
                message: 'Subcategoria actualizada correctamente'
            });
        } else {
            res.status(400).json({
                code: 'SUBCATEGORY_NO_EXIST',
                message: 'La subcategoria no existe.'
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
        const subcategory = await SubCategory.findOne({ _id: req.params.id });

        if (subcategory) {
            await subcategory.remove();
            res.status(200).json({
                code: 'OK',
                message: 'Subcategoria eliminada correctamente'
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