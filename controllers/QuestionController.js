const Question = require('../models/Question');
const { populate } = require('../models/Question');

const all = async function (req, res, next) {
    try {

        var questions;
        //req.query.search = 'familias'
        if (req.query.search) {

            var questionsAux = [];
            questions = await Question.find()
                .populate("category")
                .populate("subcategory")

            questions.forEach(element => {
                if (element.question.toLowerCase().includes(String(req.query.search).toLowerCase())
                    || element.category.name.toLowerCase().includes(String(req.query.search).toLowerCase())
                    || element.subcategory.name.toLowerCase().includes(String(req.query.search).toLowerCase())) {

                    questionsAux.push(element)
                }
            });

            questions=questionsAux
            
        } else {

            questions = await Question.find()
                .populate("category")
                .populate("subcategory");
        }

        res.status(200).json(questions);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const show = async function (req, res, next) {
    try {
        const question = await Question.findOne({ _id: req.params.id })
            .populate("category")
            .populate("subcategory");

        res.status(200).json(question);
    } catch (err) {
        next({
            code: 500,
            message: err.message
        })
    }
}

const create = async function (req, res, next) {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json({
            code: 'OK',
            message: 'Pregunta creada correctamente'
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
        const question = await Question.findOne({ _id: req.params.id });

        if (question) {
            question.question = req.body.question;
            question.answer = req.body.answer;
            question.category = req.body.category;
            question.subcategory = req.body.subcategory;
            await question.save();
            res.status(200).json({
                code: 'OK',
                message: 'Pregunta actualizada correctamente'
            });
        } else {
            res.status(400).json({
                code: 'QUESTION_NO_EXIST',
                message: 'La pregunta no existe.'
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
        const question = await Question.findOne({ _id: req.params.id });

        if (question) {
            await question.remove();
            res.status(200).json({
                code: 'OK',
                message: 'Pregunta eliminada correctamente'
            });
        } else {
            res.status(400).json({
                code: 'QUESTION_NO_EXIST',
                message: 'La pregunta no existe'
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