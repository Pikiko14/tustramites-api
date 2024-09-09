var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const CategoryController = require('../controllers/CategoryController');

/**
 * @swagger
 *  definitions:
 *      Category:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 * 
 */


/**
 * @swagger
 * /api/category:
 *  get:
 *      tags:
 *      - Category
 *      summary: Obtiene todas las categorias
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, CategoryController.all);

/**
 * @swagger
 * /api/category/{id}:
 *  get:
 *      tags:
 *      - Category
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
router.get('/:id', middleware.mdAuthorize, CategoryController.show);

/**
 * @swagger
 * /api/category:
 *  post:
 *      tags:
 *      - Category
 *      summary: Inserta una categoria nueva
 *      parameters:
 *         - name: Category
 *           description: Objeto Category
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Category'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, CategoryController.create);

/**
 * @swagger
 * /api/category/{id}:
 *  put:
 *      tags:
 *      - Category
 *      summary: Actualiza una categoria por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la pagina para actualizar.
 *         - name: Category
 *           description: Objeto Category
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Category'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, CategoryController.update);

/**
 * @swagger
 * /api/category/{id}:
 *  delete:
 *      tags:
 *      - Category
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
router.delete('/:id', middleware.mdAuthorize, CategoryController.remove);


module.exports = router;