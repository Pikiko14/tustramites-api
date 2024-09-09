const User = require('../models/User');
const { genSalt, hash, compare } = require("bcryptjs");
const Utils = require('../helpers/utils');
const fs = require('fs');
const storage = require('../helpers/storage');
const { use } = require('passport');

const all = async function (req, res, next) {
    try {
        const data = req.decode;
        if (data) {
            const users = await User.find();
            res.status(200).json(users);
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
        const data = req.decode;
        if (data) {
            const user = await User.findOne({ _id: req.params.id });
            res.status(200).json(user);
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
        const data = JSON.parse(req.body.user);
        const user = new User({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: data.role,
            enterprise: data.enterprise != '',
            name_enterprise: data.enterprise,
            phone: data.phone || ''
        })

        const userFind = await User.findOne({ email: user.email });
        if (!userFind) {

            const salt = await genSalt(10);
            const hashPassword = await hash(data.password, salt);
            user.password = hashPassword;
            user.created_at = new Date();
            const files = req.files;

            if (files) {

                storage
                    .save(files.image, 0, 'user')
                    .then(async (file_storage) => {
                        const filename = file_storage.Location;
                        user.url_image = filename;

                        await user.save();
                        res.status(201).json({
                            code: 'OK',
                            message: 'Usuario creado correctamente'
                        });

                    });

            } else {
                user.url_image = "";

                await user.save();
                res.status(201).json({
                    code: 'OK',
                    message: 'Usuario creado correctamente'
                });
            }
        } else {
            res.status(400).json({
                code: 'USER_EXIST',
                message: 'Este correo ya se encuentra registrado. Te invitamos a iniciar sesión.'
            });
        }


    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const update = async function (req, res, next) {
    try {
        const data = req.decode;
        if (data) {
            const user = await User.findOne({ _id: req.params.id });

            if (user) {

                const data = JSON.parse(req.body.user);
                //const salt = await genSalt(10);
                //const hashPassword = await hash(user.password, salt);
                const files = req.files;

                if (files) {
                    console.log(user.url_image)
                    if (user.url_image != "") {
                        storage
                            .delete(user.url_image, 0)
                            .then(async (file_delete) => {

                                storage
                                    .save(files.image, 0, 'user')
                                    .then(async (file_storage) => {

                                        user.first_name = data.first_name;
                                        user.last_name = data.last_name;
                                        user.email = data.email;
                                        user.password = user.password;
                                        user.role = data.role;
                                        user.url_image = file_storage.Location;
                                        user.phone = data.phone;
                                        user.enterprise = data.enterprise;
                                        user.name_enterprise = data.name_enterprise || "";

                                        await user.save();
                                        res.status(200).json({
                                            code: 'OK',
                                            message: 'Usuario actualizado correctamente'
                                        });
                                    })
                            })
                    } else {
                        storage
                            .save(files.image, 0, 'user')
                            .then(async (file_storage) => {

                                user.first_name = data.first_name;
                                user.last_name = data.last_name;
                                user.email = data.email;
                                user.password = user.password;
                                user.role = data.role;
                                user.url_image = file_storage.Location;
                                user.phone = data.phone;
                                user.enterprise = data.enterprise;
                                user.name_enterprise = data.name_enterprise || "";

                                await user.save();
                                res.status(200).json({
                                    code: 'OK',
                                    message: 'Usuario actualizado correctamente'
                                });
                            })
                    }

                } else {

                    if (user.url_image != ''&& data.change_image) {
                        storage
                            .delete(user.url_image, 0)
                            .then(async (file_delete) => {
                                user.url_image = '';
                                user.first_name = data.first_name;
                                user.last_name = data.last_name;
                                user.email = data.email;
                                user.password = user.password;
                                user.role = data.role;
                                user.phone = data.phone;
                                user.enterprise = data.enterprise;
                                user.name_enterprise = data.name_enterprise || "";

                                await user.save();
                                res.status(200).json({
                                    code: 'OK',
                                    message: 'Usuario actualizado correctamente'
                                });
                            })
                    } else {
                        user.first_name = data.first_name;
                        user.last_name = data.last_name;
                        user.email = data.email;
                        user.password = user.password;
                        user.role = data.role;
                        user.phone = data.phone;
                        user.enterprise = data.enterprise;
                        user.name_enterprise = data.name_enterprise || "";

                        await user.save();
                        res.status(200).json({
                            code: 'OK',
                            message: 'Usuario actualizado correctamente'
                        });
                    }
                }

            } else {
                res.status(400).json({
                    code: 'USER_NO_EXIST',
                    message: 'El usuario no existe.'
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
        const data = req.decode;
        if (data) {
            const user = await User.findOne({ _id: req.params.id });

            if (user) {

                if (user.url_image != "") {
                    storage
                        .delete(user.url_image, 0)
                        .then(async (_) => {
                            await user.remove();
                            res.status(200).json({
                                code: 'OK',
                                message: 'Usuario eliminado correctamente'
                            });
                        })
                } else {
                    await user.remove();
                    res.status(200).json({
                        code: 'OK',
                        message: 'Usuario eliminado correctamente'
                    });
                }

            } else {
                res.status(400).json({
                    code: 'USER_NO_EXIST',
                    message: 'El usuario no existe'
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

const reload = async function (req, res, next) {
    try {
        const user = req.decode;
        const userInstace = await User.findOne({_id: user.id});
        const parseUser = userInstace.toJSON()
        delete parseUser.password;
        res.status(200).json(parseUser);
    } catch (error) {
        next({
            code: 500,
            message: error.message
        })
    }
}

const login = async (req, res, next) => {

    try {
        var user = await User.findOne({ email: req.body.email, role: 'ADMINISTRADOR' });

        if (user == null)
            user = await User.findOne({ email: req.body.email, role: 'CALL CENTER' });

        if (!user) {
            res.status(400).json({
                code: 'USER_NO_EXIST',
                message: 'Usuario no encontrado.'
            });
        } else if (user) {
            const valid = await compare(req.body.password, user.password);
            if (!valid) {
                res.status(400).json({ code: 'PASSWORD_INCORRECT', message: 'Contraseña incorrecta.' });
            } else {
                var userload;
                if (user.url_image) {
                    userload = {
                        id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        role: user.role,
                        email: user.email,
                        url_image: user.url_image,
                        email: user.email,
                        enterprise: user.enterprise || "",
                        phone: user.phone || "",
                        name_enterprise: user.name_enterprise
                    }
                } else {
                    userload = {
                        id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        role: user.role,
                        email: user.email,
                        enterprise: user.enterprise || "",
                        phone: user.phone || "",
                        name_enterprise: user.name_enterprise
                    }
                }
                var token = Utils.genarteToken(userload, 5, 'hours');
                res.status(200).json({ code: 'OK', token: token, user: userload });
            }
        }


    } catch (error) {
        next({
            code: 500,
            message: error.message
        })
    }
}

const loginAux = async (req, res, next) => {

    try {

        const user = await User.findOne({ email: req.body.email, $or: [{ role: 'CLIENTE' }, { role: 'ASESOR LEGAL' }] })

        if (!user) {
            res.status(400).json({
                code: 'ERROR',
                message: 'Usuario o contraseña incorrectos.'
            });
        } else if (user) {
            const valid = await compare(req.body.password, user.password);
            if (!valid) {
                res.status(400).json({ code: 'ERROR', message: 'Usuario o contraseña incorrectos.' });
            } else {
                const parseUser = user.toJSON()
                const userload = {
                    id: parseUser._id,
                    ...parseUser
                };
                delete userload.password;
                console.log({userload})
                const token = Utils.genarteToken(userload, 5, 'hours');
                res.status(200).json({ code: 'OK', token: token, user: userload });
            }
        }

    } catch (error) {
        next({
            code: 500,
            message: "Ha ocurrido un error al iniciar sesión."
        })
    }
}

const allClients = async function (req, res, next) {
    try {
        const data = req.decode;
        if (data) {
            var users = await User.find({ role: 'CLIENTE' });
            var usersAux = [];
            users.forEach(element => {
                if (req.query.type == 1) {
                    if (element.enterprise) {
                        usersAux.push(element)
                    }
                } else {
                    if (!element.enterprise) {
                        usersAux.push(element)
                    }
                }
            });
            users = usersAux;
            res.status(200).json(users);
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
    remove,
    reload,
    login,
    loginAux,
    allClients
}