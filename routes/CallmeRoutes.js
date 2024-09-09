var express = require('express');
var router = express.Router();

const CallmeController = require('../controllers/CallmeController');
const middleware = require('../helpers/middleware');
/**
 * @swagger
 *  definitions:
 *      Callme:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              phone:
 *                  type: string
 *              message:
 *                  type: string    
 *              state:
 *                  type: boolean 
 *              schedule:
 *                  type: string 
 */


/**
 * @swagger
 * /api/callme:
 *  get:
 *      tags:
 *      - Callme
 *      summary: Obtiene todas las solicitudes de llamadas
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, CallmeController.all);

/**
 * @swagger
 * /api/callme/{id}:
 *  get:
 *      tags:
 *      - Callme
 *      summary: Obtiene una solicitud de llamada por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la solicitud de llamada a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, CallmeController.show);

/**
 * @swagger
 * /api/callme:
 *  post:
 *      tags:
 *      - Callme
 *      summary: Inserta una solicitud de llamada nueva
 *      parameters:
 *         - name: Callme
 *           description: Objeto Callme
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Callme'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', CallmeController.create);

/**
 * @swagger
 * /api/callme/{id}:
 *  put:
 *      tags:
 *      - Callme
 *      summary: Actualiza una solicitud de llamada por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la solicitud de llamada para actualizar.
 *         - name: Callme
 *           description: Objeto callme
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Callme'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, CallmeController.update);

/**
 * @swagger
 * /api/callme/{id}:
 *  delete:
 *      tags:
 *      - Callme
 *      summary: Elimina una solicitud de llamada por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la solicitud de llamada para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, CallmeController.remove);


module.exports = router;