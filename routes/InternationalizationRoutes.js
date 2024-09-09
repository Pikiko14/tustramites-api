var express = require('express');
var router = express.Router();

const InternationalizationController = require('../controllers/InternationalizationController');

/**
 * @swagger
 *  definitions:
 *      Internationalization:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              state:
 *                  type: boolean
 * 
 */


/**
 * @swagger
 * /api/internationalization:
 *  get:
 *      tags:
 *      - Internacionalization
 *      summary: Obtiene todos los lenguajes activos
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', InternationalizationController.all);

/**
 * @swagger
 * /api/internationalization:
 *  get:
 *      tags:
 *      - Internacionalization
 *      summary: Obtiene todos los lenguajes
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
 router.get('/admin', InternationalizationController.allAdmin);

/**
 * @swagger
 * /api/internationalization/{id}:
 *  get:
 *      tags:
 *      - Internacionalization
 *      summary: Obtiene un lenguaje por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del lenguaje a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', InternationalizationController.show);

/**
 * @swagger
 * /api/internationalization:
 *  post:
 *      tags:
 *      - Internacionalization
 *      summary: Inserta un lenguaje nuevo
 *      parameters:
 *         - name: lenhguaje
 *           description: Objeto internacionalización
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Internationalization'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', InternationalizationController.create);

/**
 * @swagger
 * /api/internationalization/{id}:
 *  put:
 *      tags:
 *      - Internacionalization
 *      summary: Actualiza un lenguaje por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del lenguaje para actualizar.
 *         - name: Lenguaje
 *           description: Objeto internacionalización
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Internationalization'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', InternationalizationController.update);

/**
 * @swagger
 * /api/internationalization/{id}:
 *  delete:
 *      tags:
 *      - Internacionalization
 *      summary: Elimina un lenguaje por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del lenguaje para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', InternationalizationController.remove);


module.exports = router;