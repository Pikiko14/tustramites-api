var express = require('express');
var router = express.Router();

const QuestionController = require('../controllers/QuestionController');

/**
 * @swagger
 *  definitions:
 *      Question:
 *          type: object
 *          properties:
 *              question:
 *                  type: string
 *              answer:
 *                  type: string
 *              category:
 *                  type: string
 *              subcategory:
 *                  type: string   
 */


/**
 * @swagger
 * /api/question:
 *  get:
 *      tags:
 *      - Question
 *      summary: Obtiene todas las preguntas
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', QuestionController.all);

/**
 * @swagger
 * /api/question/{id}:
 *  get:
 *      tags:
 *      - Question
 *      summary: Obtiene una pregunta por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la pregunta a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', QuestionController.show);

/**
 * @swagger
 * /api/question:
 *  post:
 *      tags:
 *      - Question
 *      summary: Inserta una pregunta nueva
 *      parameters:
 *         - name: Question
 *           description: Objeto Question
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Question'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', QuestionController.create);

/**
 * @swagger
 * /api/question/{id}:
 *  put:
 *      tags:
 *      - Question
 *      summary: Actualiza una pregunta por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la pregunta para actualizar.
 *         - name: Question
 *           description: Objeto Question
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Question'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', QuestionController.update);

/**
 * @swagger
 * /api/question/{id}:
 *  delete:
 *      tags:
 *      - Question
 *      summary: Elimina una pregunta por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la pregunta para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', QuestionController.remove);


module.exports = router;