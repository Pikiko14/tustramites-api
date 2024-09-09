var express = require('express');
var router = express.Router();

const ChatController = require('../controllers/ChatController');

/**
 * @swagger
 *  definitions:
 *      Chat:
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
 * /api/chat:
 *  get:
 *      tags:
 *      - Chat
 *      summary: Obtiene todas las solicitudes de llamadas
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', ChatController.all);

/**
 * @swagger
 * /api/chat/{id}:
 *  get:
 *      tags:
 *      - Chat
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
router.get('/:id', ChatController.show);

/**
 * @swagger
 * /api/callme:
 *  post:
 *      tags:
 *      - Chat
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
router.post('/', ChatController.create);

/**
 * @swagger
 * /api/chat/{id}:
 *  put:
 *      tags:
 *      - Chat
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
router.put('/:id', ChatController.update);

/**
 * @swagger
 * /api/chat/{id}:
 *  delete:
 *      tags:
 *      - Chat
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
router.delete('/:id', ChatController.remove);


module.exports = router;