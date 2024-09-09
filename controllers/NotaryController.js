const Notary = require('../models/Notary');

const all = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            var notaries;

            if (req.query.province || req.query.city || req.query.sector) {

                var notariesAux = [];
                notaries = await Notary.find({ country: 'Ecuador' });

                notaries.forEach(element => {
                    if (req.query.sector) {
                        if (element.province.toLowerCase() == (String(req.query.province).toLowerCase())
                            && element.city.toLowerCase() == (String(req.query.city).toLowerCase())
                            && element.sector.toLowerCase() == (String(req.query.sector).toLowerCase())) {

                            notariesAux.push(element)
                        }
                    } else if (req.query.city) {
                        if (element.province.toLowerCase() == (String(req.query.province).toLowerCase())
                            && element.city.toLowerCase() == (String(req.query.city).toLowerCase())) {

                            notariesAux.push(element)
                        }
                    } else {
                        if (element.province.toLowerCase() == (String(req.query.province).toLowerCase())) {

                            notariesAux.push(element)
                        }
                    }
                });

                notaries = notariesAux

            } else {

                notaries = await Notary.find({ country: 'Ecuador' });

            }
            res.status(200).json(notaries);
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
            const notary = await Notary.findOne({ _id: req.params.id });
            res.status(200).json(notary);
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
            const notary = new Notary(req.body);
            await notary.save();
            res.status(201).json({
                code: 'OK',
                message: 'Notaria creada correctamente'
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
            const notary = await Notary.findOne({ _id: req.params.id });

            if (notary) {
                notary.name = req.body.name;
                notary.contact = req.body.contact;
                notary.address = req.body.address;
                notary.email = req.body.email;
                notary.phone = req.body.phone;
                notary.country = req.body.country;
                notary.province = req.body.province;
                notary.city = req.body.city;
                notary.sector = req.body.sector;
                notary.schedule = req.body.schedule;
                notary.commissioner = req.body.commissioner;
                notary.type_bank_account = req.body.type_bank_account;
                notary.account_number = req.body.account_number;
                notary.bank = req.body.bank;
                await notary.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Notaria actualizada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'NOTARY_NO_EXIST',
                    message: 'La Notaria no existe por ese id'
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
            const notary = await Notary.findOne({ _id: req.params.id });

            if (notary) {
                await notary.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Notaria eliminada correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'NOTARY_NO_EXIST',
                    message: 'La notaria no existe por ese id'
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

const schedule = async function (req, res, next) {
    try {
        const notary = await Notary.findOne({ _id: req.params.id });
        var data = [];

        let schedule = notary.schedule.schedules;
        var result;
        for (let i = 0; i < schedule.length; i++) {

            let days = schedule[i].days.split("-");
            if (result) {
                var aux = [...data];
                aux.push(result);
                data = aux;
            }

            result = new Object();

            for (let k = 0; k < days.length; k++) {
                let element = days[k];
                let key;
                if (element === 'lunes') {
                    key = 1;
                } else if (element === 'martes') {
                    key = 2;
                } else if (element === 'miercoles') {
                    key = 3;
                } else if (element === 'jueves') {
                    key = 4;
                } else if (element === 'viernes') {
                    key = 5;
                } else if (element === 'sabado') {
                    key = 6;
                } else if (element === '') {
                    break;
                }

                let hours = [];
                var newHour = schedule[i].startHour;
                hours.push(newHour)
                let difference = parseInt(schedule[i].endHour.split(":")[0]) - parseInt(schedule[i].startHour.split(":")[0]);

                for (let j = 1; j < (difference * 2); j++) {

                    if (j % 2 === 0)
                        newHour = parseInt(newHour.split(":")[0]) + 1 + ":00";
                    else
                        newHour = newHour.split(":")[0] + ":30";


                    hours.push(newHour)
                }

                if (key) {
                    result[key] = hours;
                }
            }

            if (i === schedule.length - 1) {
                var aux = [...data];
                aux.push(result);
                data = aux;
            }
        }

        let dataFinal = [];
        data.forEach(element => {
            Object.keys(element).forEach(aux => {
                let b = new Object();
                let c = new Object();
                b.day = aux;
                c.schedules = element[aux]
                b.schedule = c;
                let bs = [...dataFinal];
                bs.push(b)
                dataFinal = bs;
            });
        });

        res.status(200).json(dataFinal);
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
    schedule
}