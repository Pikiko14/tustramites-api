var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const NotaryController = require('../controllers/NotaryController');

/**
 * @swagger
 *  definitions:
 *      Notary:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              contact:
 *                  type: string
 *              address:
 *                  type: string
 *              email:
 *                  type: string
 *              phone:
 *                  type: string
 *              country:
 *                  type: string
 *              province:
 *                  type: string
 *              city:
 *                  type: string
 *              sector:
 *                  type: string
 *              schedule:
 *                  type: object
 */


/**
 * @swagger
 * /api/notary:
 *  get:
 *      tags:
 *      - Notary
 *      summary: Obtiene todas las notarias
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, NotaryController.all);

/**
 * @swagger
 * /api/notary/{id}:
 *  get:
 *      tags:
 *      - Notary
 *      summary: Obtiene una notaria por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la notaria a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, NotaryController.show);

/**
 * @swagger
 * /api/notary:
 *  post:
 *      tags:
 *      - Notary
 *      summary: Inserta una notaria nueva
 *      parameters:
 *         - name: Notary
 *           description: Objeto Notary
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Notary'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, NotaryController.create);

/**
 * @swagger
 * /api/notary/{id}:
 *  put:
 *      tags:
 *      - Notary
 *      summary: Actualiza una notaria por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la pagina para actualizar.
 *         - name: Notary
 *           description: Objeto Notary
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Notary'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, NotaryController.update);

/**
 * @swagger
 * /api/notary/{id}:
 *  delete:
 *      tags:
 *      - Notary
 *      summary: Elimina una notaria por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la notaria para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, NotaryController.remove);

/**
 * @swagger
 * /api/notary/schedule/{id}:
 *  get:
 *      tags:
 *      - Notary
 *      summary: Obtiene el horario de una notaria por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id de la notaria a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
 router.get('/schedule/:id', middleware.mdAuthorize, NotaryController.schedule);


module.exports = router;