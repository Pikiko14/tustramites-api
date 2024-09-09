const User = require('../models/User');
const Utils = require('../helpers/utils');
const { genSalt, hash, compare } = require("bcryptjs");
const Secutiry = require("../helpers/Auth/security");
const jwt = require('../helpers/Auth/jwt');
const Smtp = require('../helpers/email/Smtp');

const login = async function (req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            if (!user.verify) {
                res.status(400).json({
                    code: "NO_VRIFY",
                    message: "Usuario no verificado.",
                });
            } else {
                const valid = await compare(req.body.password, user.password);
                if (!valid) {
                    res.status(400).json({
                        code: "NO_FOUND",
                        message: "Contraseña incorrecta.",
                    });
                } else {
                    var payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role,
                        enterprise: user.enterprise||"",
                        url_image: user.url_image||""
                    };

                    var token = Utils.genarteToken(payload, 5, "hours");
                    res.status(200).json({ code: "OK", token: token, user: payload });
                }
            }
        } else {
            res.status(400).json({
                code: "NO_FOUND",
                message: "Usuario incorrecto.",
            });
        }
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const social = async (req, res, next) => {

    try {
        const user = await User
            .findOne({
                email: req.body.email,
                profile_id: req.body.profile_id
            });

        if (user) {
            var payload = {
                _id: user._id,
                full_name: user.full_name,
                nickname: user.nickname,
                email: user.email,
                interest: user.interest || "",
                phone: user.phone || "",
                county: user.county || "",
                state: user.state || "",
                city: user.city || "",
                address: user.address || "",
                url_image: user.url_image || "",
                enterprise: user.enterprise||"",
                url_image: user.url_image||""
            }

            var token = Secutiry.genarteToken(payload, 5, 'hours');
            res.status(200).json({ code: 'OK', token: token, user: payload });

        } else {
            const salt = await genSalt(10);
            const hashPassword = await hash(req.body.profile_id, salt);

            const email = req.body.email;

            const userCreate = new User({
                full_name: req.body.full_name,
                nickname: email.substring(0, email.lastIndexOf("@")),
                email: email,
                password: hashPassword,
                url_image: req.body.url_image,
                verify: true
            });
            await userCreate.save();

            var payload = {
                _id: userCreate._id,
                full_name: userCreate.full_name,
                nickname: userCreate.nickname,
                email: userCreate.email,
                interest: userCreate.interest || "",
                phone: userCreate.phone || "",
                county: userCreate.county || "",
                state: userCreate.state || "",
                city: userCreate.city || "",
                address: userCreate.address || "",
                url_image: userCreate.url_image || "",
                enterprise: userCreate.enterprise||"",
                url_image: user.url_image||""
            }

            var token = Secutiry.genarteToken(payload, 5, 'hours');
            res.status(200).json({ code: 'OK', token: token, user: payload });
        }


    } catch (error) {
        next({
            code: 500,
            message: error.message
        });

    }
}

const remember = async function (req, res, next) {
    try {
        const user = await User
            .findOne({
                email: req.body.email
            });

        if (user) {
            var token = jwt.genarteToken(user, 2, 'hours');
            var link = process.env.CLIENT_URL + "/rememberrestart?id=" + token;
            await Smtp.send(
                //"jefon524@gmail.com",
                user.email,
                "Reestablecer la contraseña",
                "remember",
                {
                    name: user.first_name + " " + user.last_name,
                    email: user.email,
                    link: link,
                    url: process.env.CLIENT_URL+'/policies'
                }
            );

            res.status(200).json({
                code: 'OK',
                message: 'Link enviado Satisfactoriamente'
            });

        } else {
            res.status(400).json({
                code: 'USER_NO_EXIST',
                message: 'Usuario no encontrado.'
            });
        }
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const rememberRestart = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const userA = await User
                .findOne({
                    email: user.email
                });
            const salt = await genSalt(10);
            const hashPassword = await hash(req.body.password, salt);
            userA.password = hashPassword;
            await userA.save();

            res.status(200).json({
                code: 'OK',
                message: 'Contraseña actualizada correctamente'
            });
        }
        else {
            res.status(500).json({
                code: 500,
                message: 'Error del servidor'
            });
        }
    } catch (error) {
        console.log(error.message)
        next({
            code: 500,
            message: error.message
        })
    }
}

const rememberRestartLogin = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const userA = await User
                .findOne({
                    email: user.email
                });

            

            const valid = await compare(req.body.password, userA.password);
            if (!valid) {
                res.status(400).json({ code: 'PASSWORD_INCORRECT', message: 'Contraseña actual incorrecta.' });
            } else {
                const salt = await genSalt(10);
                const hashPassword = await hash(req.body.passwordNew, salt);
                userA.password = hashPassword;
                await userA.save();

                res.status(200).json({
                    code: 'OK',
                    message: 'Contraseña actualizada correctamente'
                });
            }

        }
        else {
            res.status(500).json({
                code: 500,
                message: 'Error del servidor'
            });
        }
    } catch (error) {
        console.log(error.message)
        next({
            code: 500,
            message: error.message
        })
    }
}


module.exports = {
    login,
    social,
    remember,
    rememberRestart,
    rememberRestartLogin
};
