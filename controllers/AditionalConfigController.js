const AditionalConfig = require('../models/AditionalConfig');

const all = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {

            const aditionalconfigs = await AditionalConfig.find();
            res.status(200).json(aditionalconfigs);
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
            const aditionalConfig = await AditionalConfig.findOne({ _id: req.params.id });
            res.status(200).json(aditionalConfig);
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

const search = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const aditionalConfig = await AditionalConfig.find({ type: req.params.type });
            let result = ''
            if (aditionalConfig.length > 0) {
                aditionalConfig.map(item => result += (item.value + ' - '))
            }

            res.status(200).json(result.substring(0, result.length - 3));
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
            const aditionalConfig = new AditionalConfig(req.body);
            console.log(aditionalConfig)
            await aditionalConfig.save();
            res.status(201).json({
                code: 'OK',
                message: 'Configuración adicional creada correctamente'
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
            const aditionalConfig = await AditionalConfig.findOne({ _id: req.params.id });

            if (aditionalConfig) {
                aditionalConfig.name = req.body.name;
                aditionalConfig.type = req.body.type;
                aditionalConfig.value = req.body.value;
                await aditionalConfig.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Configuración adicional actualizada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'ADITIONAL_CONFIG_NO_EXIST',
                    message: 'La configuración adicional no existe.'
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
            const aditionalConfig = await AditionalConfig.findOne({ _id: req.params.id });

            const typeConfigs = await AditionalConfig.find({ type: aditionalConfig.type })
            if (typeConfigs.length > 1) {
                if (aditionalConfig) {
                    await aditionalConfig.remove();
                    res.status(200).json({
                        code: 'OK',
                        message: 'Configuración adicional eliminada correctamente'
                    });
                } else {
                    res.status(400).json({
                        code: 'ADITIONAL_CONFIG_NO_EXIST',
                        message: 'La configuración adicional no existe'
                    });
                }
            } else {
                res.status(400).json({
                    code: 'ADITIONAL_CONFIG_ONE',
                    message: 'La configuración adicional no puede eliminarse, ya que es el unico de ese tipo.'
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
    search,
    create,
    update,
    remove
}