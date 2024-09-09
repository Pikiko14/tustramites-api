const ProcedureNotarial = require('../models/ProcedureNotarial');
const User = require('../models/User');
const { populate } = require('../models/ProcedureNotarial');
const Smtp = require('../helpers/email/Smtp');
const storage = require('../helpers/storage');

const all = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            var notarialProcedures;
            if (req.query.state && !req.query.user) {
                notarialProcedures = await ProcedureNotarial.find({ state: req.query.state }).sort({ date: 'ascending' })
                    .populate("notarialAct")
                    .populate("notary")
                    .populate("user");
                var notarialProceduresAux = [];
                notarialProcedures.forEach(element => {
                    if (element.state !== '1' && element.state !== '2' && element.state !== '3' && element.state !== '4') {
                        notarialProceduresAux.push(element);
                    }
                });

                res.status(200).json(notarialProcedures);
            } else if (req.query.state && req.query.user && req.query.user === '1') {

                var notarialProceduresAux = [];
                notarialProcedures = await ProcedureNotarial.find({ state: req.query.state }).sort({ date: 'ascending' })
                    .populate("notarialAct")
                    .populate("notary")
                    .populate("user");

                notarialProcedures.forEach(element => {
                    if (element.user.enterprise) {
                        if (element.state !== '1' && element.state !== '2' && element.state !== '3' && element.state !== '4') {
                            notarialProceduresAux.push(element);
                        }
                    }
                });

                res.status(200).json(notarialProceduresAux);

            } else if (req.query.state && req.query.user && req.query.user !== '1') {

                var notarialProceduresAux = [];
                notarialProcedures = await ProcedureNotarial.find({ state: req.query.state }).sort({ date: 'ascending' })
                    .populate("notarialAct")
                    .populate("notary")
                    .populate("user");

                notarialProcedures.forEach(element => {
                    if (!element.user.enterprise) {
                        if (element.state !== '1' && element.state !== '2' && element.state !== '3' && element.state !== '4') {
                            notarialProceduresAux.push(element);
                        }
                    }
                });

                res.status(200).json(notarialProceduresAux);
            } else {
                var notarialProceduresAux = [];
                notarialProcedures = await ProcedureNotarial.find().sort({ date: 'ascending' })
                    .populate("notarialAct")
                    .populate("notary")
                    .populate("user");
                notarialProcedures.forEach(element => {
                    if (element.state !== '1' && element.state !== '2' && element.state !== '3' && element.state !== '4') {
                        notarialProceduresAux.push(element);
                    }
                });

                res.status(200).json(notarialProceduresAux);
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

const show = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const notarialProcedures = await ProcedureNotarial.find({ user: req.params.id })
                .populate("notarialAct")
                .populate("notary")
                .populate("user");

            res.status(200).json(notarialProcedures);
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

const showId = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {
            const notarialProcedure = await ProcedureNotarial.findOne({ _id: req.params.id })
                .populate("notarialAct")
                .populate("notary")
                .populate("user");

            res.status(200).json(notarialProcedure);
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
            const notarial = req.body.notarial ? JSON.parse(req.body.notarial) : req.body;
            const procedureNotarial = new ProcedureNotarial({ ...notarial });
            procedureNotarial.date = new Date();

            const files = req.files;
            if (files) {
                const listDocument = [];
                if (files.file.length > 0) {
                    for (var i = 0; i < files.file.length; i++) {
                        const item = files.file[i];
                        var urlDocument;
                        urlDocument = await storage.save(item, 1, 'documents/' + procedureNotarial._id)
                        listDocument.push(urlDocument.Location);
                    }
                } else {
                    const item = files.file;
                    var urlDocument;
                    urlDocument = await storage.save(item, 1, 'documents/' + procedureNotarial._id)
                    listDocument.push(urlDocument.Location);
                }
                procedureNotarial.documents = listDocument
            }

            await procedureNotarial.save();
            res.status(201).json({
                code: 'OK',
                id: procedureNotarial._id,
                message: 'Trámite notarial creado correctamente'
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
            const procedureNotarial = await ProcedureNotarial.findOne({ _id: req.params.id });

            const notarial = req.body.notarial ? JSON.parse(req.body.notarial) : req.body;

            if (procedureNotarial) {
                procedureNotarial.notarialAct = notarial.notarialAct;
                procedureNotarial.state = notarial.state;
                procedureNotarial.user = notarial.user;

                // GUARDA DOCUMENTOS
                const files = req.files;
                if (files) {
                    const listDocument = [];
                    if (files.file.length > 0) {
                        for (var i = 0; i < files.file.length; i++) {
                            const item = files.file[i];
                            var urlDocument;
                            urlDocument = await storage.save(item, 1, 'documents/' + procedureNotarial._id)
                            listDocument.push(urlDocument.Location);
                        }
                    } else {
                        const item = files.file;
                        var urlDocument;

                        if (notarial.state === '3') {
                            urlDocument = await storage.save(item, 1, 'documents/' + procedureNotarial._id)
                            listDocument.push(urlDocument.Location);
                            procedureNotarial.documents = listDocument
                        } else if (notarial.state === '6' || notarial.state === '7') {
                            urlDocument = await storage.save(item, 1, 'proofs_payment/' + procedureNotarial._id)
                            procedureNotarial.payment_proof = urlDocument.Location
                        }
                        else if (notarial.state === '8') {
                            urlDocument = await storage.save(item, 1, 'documents_result/' + procedureNotarial._id)
                            procedureNotarial.document_result = urlDocument.Location
                        }
                    }
                }

                if (notarial.actors)
                    procedureNotarial.actors = notarial.actors;

                /*if (notarial.documents)
                    procedureNotarial.documents = notarial.documents;*/

                if (notarial.notary)
                    procedureNotarial.notary = notarial.notary;

                if (notarial.group_id)
                    procedureNotarial.group_id = notarial.group_id;

                if (notarial.observation_document)
                    procedureNotarial.observation_document = notarial.observation_document;

                if (notarial.payment_data)
                    procedureNotarial.payment_data = notarial.payment_data;

                if (notarial.paid_out)
                    procedureNotarial.paid_out = notarial.paid_out;

                if (notarial.payment_proof)
                    procedureNotarial.payment_proof = notarial.payment_proof;

                if (notarial.observation_document_result)
                    procedureNotarial.observation_document_result = notarial.observation_document_result;

                if (notarial.date_appointment)
                    procedureNotarial.date_appointment = notarial.date_appointment;

                if (procedureNotarial.date_appointment && notarial.date_appointment === undefined) {
                    procedureNotarial.date_appointment = null;
                }

                if (notarial.order_summary_procedure) {
                    procedureNotarial.order_summary_procedure = notarial.order_summary_procedure;
                }

                if (notarial.order_summary_notary) {
                    procedureNotarial.order_summary_notary = notarial.order_summary_notary;
                }

                if (notarial.scheduled !== undefined) {
                    procedureNotarial.scheduled = notarial.scheduled;
                }

                if (notarial.document_result && notarial.state === '8') {
                    //procedureNotarial.document_result = notarial.document_result;
                    const user = await User.findOne({ _id: procedureNotarial.user });

                    var link = process.env.CLIENT_URL + "/documentresult?p=" + procedureNotarial._id;
                    await Smtp.send(
                        user.email,
                        //"jefon524@gmail.com",
                        "Borrador de tu trámite listo",
                        "notification",
                        {
                            name: user.first_name + " " + user.last_name,
                            email: user.email,
                            link: link,
                            url: process.env.CLIENT_URL+'/policies'
                        }
                    );
                }

                if (notarial.state === '11') {
                    const user = await User.findOne({ _id: procedureNotarial.user });
                    var link = process.env.CLIENT_URL + "/date?p=" + procedureNotarial._id;
                    await Smtp.send(
                        user.email,
                        //"jefon524@gmail.com",
                        "Cita preferencial activada",
                        "notification_date",
                        {
                            name: user.first_name + " " + user.last_name,
                            email: user.email,
                            link: link,
                            url: process.env.CLIENT_URL+'/policies'
                        }
                    );

                }
                //console.log(procedureNotarial.documents)
                await procedureNotarial.save();
                res.status(200).json({
                    code: 'OK',
                    message: 'Trámite notarial actualizado correctamente'
                });

            } else {
                res.status(400).json({
                    code: 'PROCEDURE_NOTARIAL_NO_EXIST',
                    message: 'Trámite notarial no existe.'
                });
            }
        } else {
            res.status(500).json({
                code: 500,
                message: 'User not found'
            })
        };
    } catch (err) {
        console.log(err.message)
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
            const procedureNotarial = await ProcedureNotarial.findOne({ _id: req.params.id });

            if (procedureNotarial) {
                await procedureNotarial.remove();
                res.status(200).json({
                    code: 'OK',
                    message: 'Trámite notarial eliminado correctamente'
                });
            } else {
                res.status(400).json({
                    code: 'PROCEDURE_NOTARIAL_NO_EXIST',
                    message: 'Trámite notarial no existe'
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

const allGroupId = async function (req, res, next) {
    try {
        const user = req.decode;
        if (user) {

            const notarialProcedures = await ProcedureNotarial.find({ group_id: req.params.id })
                .populate("notarialAct")
                .populate("notary")
                .populate("user");

            res.status(200).json(notarialProcedures);
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
    showId,
    create,
    update,
    remove,
    allGroupId
}