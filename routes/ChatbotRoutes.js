var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const ChatbotController = require('../controllers/ChatbotController');

/**
 * @swagger
 *  definitions:
 *      Chatbot:
 *          type: object
 *          properties:
 *              key:
 *                  type: number
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              secondLevel:
 *                  type: object 
 *              whatsapp:
 *                  type: boolean
 *              state:
 *                  type: boolean
 */


/**
 * @swagger
 * /api/chatbot:
 *  get:
 *      tags:
 *      - Chatbot
 *      summary: Obtiene todas las opciones del chatbot
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, ChatbotController.all);

/**
 * @swagger
 * /api/chatbot:
 *  get:
 *      tags:
 *      - Chatbot
 *      summary: Obtiene todas las opciones del chatbot activos
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/active', middleware.mdAuthorize, ChatbotController.allActive);

/**
 * @swagger
 * /api/chatbot/{id}:
 *  get:
 *      tags:
 *      - Chatbot
 *      summary: Obtiene una opción del chatbot por id
 *      parameters:
 *          - id: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la opción a consultar.
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, ChatbotController.show);

/**
 * @swagger
 * /api/chatbot:
 *  post:
 *      tags:
 *      - Chatbot
 *      summary: Inserta una opción de chatbot nueva
 *      parameters:
 *         - name: Chatbot
 *           description: Objeto Chatbot
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Chatbot'
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, ChatbotController.create);

/**
 * @swagger
 * /api/chatbot/{id}:
 *  put:
 *      tags:
 *      - Chatbot
 *      summary: Actualiza una opción de chatbot por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la opción del chatbot para actualizar.
 *         - name: Chatbot
 *           description: Objeto Chatbot
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Chatbot'
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, ChatbotController.update);

/**
 * @swagger
 * /api/chatbot/{id}:
 *  delete:
 *      tags:
 *      - Chatbot
 *      summary: Elimina una opción de chatbot por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la opción del chatbot para eliminar.
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, ChatbotController.remove);


module.exports = router;