var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const NotarialActController = require('../controllers/NotarialActController');

/**
 * @swagger
 *  definitions:
 *      NotarialAct:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              category:
 *                  type: string
 *              actors:
 *                  type: object    
 *              form:
 *                  type: object
 *              documents:
 *                  type: object
 *              notary:
 *                  type: boolean
 *              payment:
 *                  type: boolean
 *              document_result:
 *                  type: string
 *              date:
 *                  type: boolean
 *              time_delivery:
 *                  type: string
 *              duration:
 *                  type: string
 */


/**
 * @swagger
 * /api/notarialact:
 *  get:
 *      tags:
 *      - Notarial Act
 *      summary: Obtiene todos los actos notariales
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, NotarialActController.all);

/**
 * @swagger
 * /api/notarialact/{id}:
 *  get:
 *      tags:
 *      - Notarial Act
 *      summary: Obtiene un acto notarial por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del acto notarial a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, NotarialActController.show);

/**
 * @swagger
 * /api/notarialact/category/{id}:
 *  get:
 *      tags:
 *      - Notarial Act
 *      summary: Obtiene un acto notarial por id de la categoria
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la categoria acto notarial a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
 router.get('/category/:id', middleware.mdAuthorize, NotarialActController.showFromCategory);

/**
 * @swagger
 * /api/notarialact:
 *  post:
 *      tags:
 *      - Notarial Act
 *      summary: Inserta un acto notarial nuevo
 *      parameters:
 *         - name: NotarialAct
 *           description: Objeto NotarialAct
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/NotarialAct'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, NotarialActController.create);

/**
 * @swagger
 * /api/notarialact/{id}:
 *  put:
 *      tags:
 *      - Notarial Act
 *      summary: Actualiza un acto notarial por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del acto notarial para actualizar.
 *         - name: NotarialAct
 *           description: Objeto NotarialAct
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/NotarialAct'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, NotarialActController.update);

/**
 * @swagger
 * /api/notarialact/{id}:
 *  delete:
 *      tags:
 *      - Notarial Act
 *      summary: Elimina un acto notarial por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del acto notarial para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, NotarialActController.remove);


module.exports = router;