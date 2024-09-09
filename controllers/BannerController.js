const Banner = require('../models/Banner');
const fs = require('fs');
const storage = require('../helpers/storage');


const all = async function (req, res, next) {
    try {
        const banners = await Banner.find({ state: true });
        res.status(200).json(banners);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const allAdmin = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const banners = await Banner.find();
            res.status(200).json(banners);
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
            const banner = await Banner.findOne({ _id: req.params.id });
            res.status(200).json(banner);
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
                    .save(files.image, 0, 'banner')
                    .then(async (file_storage) => {
                        const filename = file_storage.Location;

                        const data = JSON.parse(req.body.banner);
                        const banner = new Banner({
                            url_image: filename,
                            name: data.name,
                            state: data.state
                        })

                        await banner.save();
                        res.status(201).json({
                            code: 'OK',
                            message: 'Banner creado correctamente'
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
    const user = req.decode;
    if (user) {
        const banner = await Banner.findOne({ _id: req.params.id });
 
        if (banner) {

            const files = req.files;
            if (files) {

                storage
                    .delete(banner.url_image, 0)
                    .then(async (file_delete) => {

                        storage
                            .save(files.image, 0, 'banner')
                            .then(async (file_storage) => {
                                const data = JSON.parse(req.body.banner);

                                banner.name = data.name;
                                banner.state = data.state;
                                banner.url_image = file_storage.Location;
                                await banner.save();

                                res.status(200).json({
                                    code: 'OK',
                                    message: 'Banner actualizado correctamente'
                                });
                            })
                    })



            } else {
                const data = JSON.parse(req.body.banner);

                banner.name = data.name;
                banner.state = data.state;
                //banner.url_image = file_storage.Location;
                await banner.save();

                res.status(200).json({
                    code: 'OK',
                    message: 'Banner actualizado correctamente'
                });
            }

        } else {
            res.status(400).json({
                code: 'BANNER_NO_EXIST',
                message: 'El banner no existe.'
            });
        }
    } else {
        res.status(500).json({
            code: 500,
            message: 'User not found'
        })
    };
}

const remove = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const banner = await Banner.findOne({ _id: req.params.id });

            if (banner) {

                storage
                    .delete(banner.url_image, 0)
                    .then(async (_) => {
                        await banner.remove();
                        res.status(200).json({
                            code: 'OK',
                            message: 'Banner eliminado correctamente'
                        });
                    })


            } else {
                res.status(400).json({
                    code: 'BANNER_NO_EXIST',
                    message: 'El banner no existe'
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
    allAdmin,
    show,
    create,
    update,
    remove
}