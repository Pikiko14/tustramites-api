var express = require('express');
var router = express.Router();

const SubCategoryQuestionController = require('../controllers/SubCategoryQuestionController');

/**
 * @swagger
 *  definitions:
 *      SubCategoryQuestion:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              category:
 *                  type: string
 */


/**
 * @swagger
 * /api/subcategoryquestion:
 *  get:
 *      tags:
 *      - Subcategory Question
 *      summary: Obtiene todas las subcategorias
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', SubCategoryQuestionController.all);

/**
 * @swagger
 * /api/subcategoryquestion/{id}:
 *  get:
 *      tags:
 *      - Subcategory Question
 *      summary: Obtiene una subcategoria por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la subcategoria a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', SubCategoryQuestionController.show);

/**
 * @swagger
 * /api/subcategoryquestion:
 *  post:
 *      tags:
 *      - Subcategory Question
 *      summary: Inserta una subcategoria nueva
 *      parameters:
 *         - name: Category
 *           description: Objeto SubCategoryQuestion
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/SubCategoryQuestion'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', SubCategoryQuestionController.create);

/**
 * @swagger
 * /api/subcategoryquestion/{id}:
 *  put:
 *      tags:
 *      - Subcategory Question
 *      summary: Actualiza una subcategoria por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la subcategoria para actualizar.
 *         - name: Category
 *           description: Objeto SubCategoryQuestion
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/SubCategoryQuestion'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', SubCategoryQuestionController.update);

/**
 * @swagger
 * /api/subcategoryquestion/{id}:
 *  delete:
 *      tags:
 *      - Subcategory Question
 *      summary: Elimina una subcategoria por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la subcategoria para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', SubCategoryQuestionController.remove);


module.exports = router;