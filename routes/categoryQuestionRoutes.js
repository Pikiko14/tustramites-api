var express = require('express');
var router = express.Router();

const CategoryQuestionController = require('../controllers/CategoryQuestionController');

/**
 * @swagger
 *  definitions:
 *      CategoryQuestion:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 * 
 */


/**
 * @swagger
 * /api/categoryquestion:
 *  get:
 *      tags:
 *      - Category Question
 *      summary: Obtiene todas las categorias
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', CategoryQuestionController.all);

/**
 * @swagger
 * /api/categoryquestion/{id}:
 *  get:
 *      tags:
 *      - Category Question
 *      summary: Obtiene una categoria por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la categoria a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', CategoryQuestionController.show);

/**
 * @swagger
 * /api/categoryquestion:
 *  post:
 *      tags:
 *      - Category Question
 *      summary: Inserta una categoria nueva
 *      parameters:
 *         - name: Category Question
 *           description: Objeto CategoryQuestion
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/CategoryQuestion'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', CategoryQuestionController.create);

/**
 * @swagger
 * /api/categoryquestion/{id}:
 *  put:
 *      tags:
 *      - Category Question
 *      summary: Actualiza una categoria por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la categoria para actualizar.
 *         - name: Category
 *           description: Objeto CategoryQuestion
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/CategoryQuestion'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', CategoryQuestionController.update);

/**
 * @swagger
 * /api/categoryquestion/{id}:
 *  delete:
 *      tags:
 *      - Category Question
 *      summary: Elimina una categoria por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la categoria para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', CategoryQuestionController.remove);


module.exports = router;