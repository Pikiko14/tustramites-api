var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const ContactController = require('../controllers/ContactController');

/**
 * @swagger
 *  definitions:
 *      Contact:
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
 */


/**
 * @swagger
 * /api/contact:
 *  get:
 *      tags:
 *      - Contact
 *      summary: Obtiene todas las solicitudes de contactos
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, ContactController.all);

/**
 * @swagger
 * /api/contact/{id}:
 *  get:
 *      tags:
 *      - Contact
 *      summary: Obtiene una solicitud de contacto por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la solicitud de contacto a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, ContactController.show);

/**
 * @swagger
 * /api/contact:
 *  post:
 *      tags:
 *      - Contact
 *      summary: Inserta una solicitud de contacto nueva
 *      parameters:
 *         - name: Contact
 *           description: Objeto Contact
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Contact'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', ContactController.create);

/**
 * @swagger
 * /api/contact/{id}:
 *  put:
 *      tags:
 *      - Contact
 *      summary: Actualiza una solicitud de contacto por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la solicitud de contacto para actualizar.
 *         - name: Contact
 *           description: Objeto contact
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Contact'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, ContactController.update);

/**
 * @swagger
 * /api/contact/{id}:
 *  delete:
 *      tags:
 *      - Contact
 *      summary: Elimina una solicitud de contacto por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la solicitud de contacto para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, ContactController.remove);


module.exports = router;