var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const PageController = require('../controllers/PageController');

/**
 * @swagger
 *  definitions:
 *      Page:
 *          type: object
 *          properties:
 *              url:
 *                  type: string
 *              title:
 *                  type: string
 *              content:
 *                  type: string
 * 
 */


/**
 * @swagger
 * /api/page:
 *  get:
 *      tags:
 *      - Page
 *      summary: Obtiene todas las paginas
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', PageController.all);

/**
 * @swagger
 * /api/page/{id}:
 *  get:
 *      tags:
 *      - Page
 *      summary: Obtiene una pagina por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: id de la pagina a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', PageController.show);

/**
 * @swagger
 * /api/page:
 *  post:
 *      tags:
 *      - Page
 *      summary: Inserta una pagina nueva
 *      parameters:
 *         - name: Page
 *           description: Objeto page
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Page'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, PageController.create);

/**
 * @swagger
 * /api/page/{id}:
 *  put:
 *      tags:
 *      - Page
 *      summary: Actualiza una pagina por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la pagina para actualizar.
 *         - name: Page
 *           description: Objeto page
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Page'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, PageController.update);

/**
 * @swagger
 * /api/page/{id}:
 *  delete:
 *      tags:
 *      - Page
 *      summary: Elimina una pagina por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id de la pagina para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, PageController.remove);


module.exports = router;