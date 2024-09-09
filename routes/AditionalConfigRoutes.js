var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const AditionalConfigController = require('../controllers/AditionalConfigController');

/**
 * @swagger
 *  definitions:
 *      AditionalConfigs:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              type:
 *                  type: string
 *              value:
 *                  type: string
 * 
 */


/**
 * @swagger
 * /api/aditional:
 *  get:
 *      tags:
 *      - AditionalConfigs
 *      summary: Obtiene todas las configuraciones adicionales
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, AditionalConfigController.all);

/**
 * @swagger
 * /api/aditional/{id}:
 *  get:
 *      tags:
 *      - AditionalConfigs
 *      summary: Obtiene una configuración adicional por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la configuración a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, AditionalConfigController.show);

/**
 * @swagger
 * /api/aditional/search/{type}:
 *  get:
 *      tags:
 *      - AditionalConfigs
 *      summary: Obtiene una configuración adicional por type
 *      parameters:
 *          - in: path
 *            name: type
 *            type: string
 *            required: true
 *            description: type de la configuración adicional a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/search/:type', middleware.mdAuthorize, AditionalConfigController.search);

/**
 * @swagger
 * /api/aditional:
 *  post:
 *      tags:
 *      - AditionalConfigs
 *      summary: Inserta una configuración adicional nueva
 *      parameters:
 *         - name: AditionalConfigs
 *           description: Objeto AditionalConfigs
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/AditionalConfigs'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, AditionalConfigController.create);

/**
 * @swagger
 * /api/aditional/{id}:
 *  put:
 *      tags:
 *      - AditionalConfigs
 *      summary: Actualiza una configuración adicional por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la configuración adicional para actualizar.
 *         - name: AditionalConfigs
 *           description: Objeto AditionalConfigs
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/AditionalConfigs'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, AditionalConfigController.update);

/**
 * @swagger
 * /api/aditional/{id}:
 *  delete:
 *      tags:
 *      - AditionalConfigs
 *      summary: Elimina una configuración adicional por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la configuración adicional para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, AditionalConfigController.remove);


module.exports = router;