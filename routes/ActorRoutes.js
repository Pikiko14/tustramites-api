var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const ActorController = require('../controllers/ActorController');

/**
 * @swagger
 *  definitions:
 *      Actor:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 * 
 */


/**
 * @swagger
 * /api/actor:
 *  get:
 *      tags:
 *      - Actor
 *      summary: Obtiene todos los actores
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, ActorController.all);

/**
 * @swagger
 * /api/actor/{id}:
 *  get:
 *      tags:
 *      - Actor
 *      summary: Obtiene un actor por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del actor a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, ActorController.show);

/**
 * @swagger
 * /api/actor:
 *  post:
 *      tags:
 *      - Actor
 *      summary: Inserta un actor nuevo
 *      parameters:
 *         - name: Actor
 *           description: Objeto Actor
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Actor'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, ActorController.create);

/**
 * @swagger
 * /api/actor/{id}:
 *  put:
 *      tags:
 *      - Actor
 *      summary: Actualiza un actor por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del actor para actualizar.
 *         - name: Actor
 *           description: Objeto Actor
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Actor'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, ActorController.update);

/**
 * @swagger
 * /api/actor/{id}:
 *  delete:
 *      tags:
 *      - Actor
 *      summary: Elimina un actor por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del actor para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, ActorController.remove);


module.exports = router;