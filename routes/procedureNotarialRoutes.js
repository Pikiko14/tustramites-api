var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const ProcedureNotarialController = require('../controllers/ProcedureNotarialController');

/**
 * @swagger
 *  definitions:
 *      ProcedureNotarial:
 *          type: object
 *          properties:
 *              notarialAct:
 *                  type: string
 *              actors:
 *                  type: object    
 *              documents:
 *                  type: object
 *              notary:
 *                  type: string
 *              state:
 *                  type: string
 *              user:
 *                  type: string
 *              group_id:
 *                  type: string
 *              observation_document:
 *                  type: string
 *              payment_data:
 *                  type: object
 */


/**
 * @swagger
 * /api/procedurenotarial:
 *  get:
 *      tags:
 *      - Procedure Notarial
 *      summary: Obtiene todos los trámites notariales por id del usuario
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, ProcedureNotarialController.all);

/**
 * @swagger
 * /api/procedurenotarial/{id}:
 *  get:
 *      tags:
 *      - Procedure Notarial
 *      summary: Obtiene un trámite notarial por id del usuario
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del trámite notarial a consultar.
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, ProcedureNotarialController.show);

/**
 * @swagger
 * /api/procedurenotarial/one/{id}:
 *  get:
 *      tags:
 *      - Procedure Notarial
 *      summary: Obtiene un trámite notarial por id del trámite
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del trámite notarial a consultar.
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/one/:id', middleware.mdAuthorize, ProcedureNotarialController.showId);

/**
 * @swagger
 * /api/procedurenotarial:
 *  post:
 *      tags:
 *      - Procedure Notarial
 *      summary: Inserta un trámite notarial notarial nuevo
 *      parameters:
 *         - name: ProcedureNotarial
 *           description: Objeto ProcedureNotarial
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/ProcedureNotarial'
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, ProcedureNotarialController.create);

/**
 * @swagger
 * /api/procedurenotarial/{id}:
 *  put:
 *      tags:
 *      - Procedure Notarial
 *      summary: Actualiza un trámite notarial por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del trámite notarial para actualizar.
 *         - name: NotarialAct
 *           description: Objeto ProcedureNotarial
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/ProcedureNotarial'
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, ProcedureNotarialController.update);

/**
 * @swagger
 * /api/procedurenotarial/{id}:
 *  delete:
 *      tags:
 *      - Procedure Notarial
 *      summary: Elimina un trámite notarial por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del trámite notarial para eliminar.
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, ProcedureNotarialController.remove);


/**
 * @swagger
 * /api/procedurenotarial/group/{id}:
 *  get:
 *      tags:
 *      - Procedure Notarial
 *      summary: Obtiene un trámite notarial por id de agrupación
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del grupo trámite notarial a consultar.
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
 router.get('/group/:id', middleware.mdAuthorize, ProcedureNotarialController.allGroupId);


module.exports = router;