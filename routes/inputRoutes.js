var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');
const InputController = require('../controllers/InputController');
const Input = require('../models/Input');

/**
 * @swagger
 *  definitions:
 *      Input:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              type:
 *                  type: string
 *              required:
 *                  type: boolean
 *              maxCant:
 *                  type: number
 *              minCant:
 *                  type: number
 *              validation:
 *                  type: boolean
 *              actor:
 *                  type: boolean
 * 
 */


/**
 * @swagger
 * /api/input:
 *  get:
 *      tags:
 *      - Input
 *      summary: Obtiene todos los input
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, InputController.all);

/**
 * @swagger
 * /api/input/{id}:
 *  get:
 *      tags:
 *      - Input
 *      summary: Obtiene un input por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del input a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, InputController.show);

/**
 * @swagger
 * /api/input:
 *  post:
 *      tags:
 *      - Input
 *      summary: Inserta un input nuevo
 *      parameters:
 *         - name: Input
 *           description: Objeto Input
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Input'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, InputController.create);

/**
 * @swagger
 * /api/input/{id}:
 *  put:
 *      tags:
 *      - Input
 *      summary: Actualiza un input por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del input para actualizar.
 *         - name: Input
 *           description: Objeto Input
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Input'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, InputController.update);

/**
 * @swagger
 * /api/input/{id}:
 *  delete:
 *      tags:
 *      - Input
 *      summary: Elimina un input por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del input para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, InputController.remove);


module.exports = router;