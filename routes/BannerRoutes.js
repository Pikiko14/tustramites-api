var express = require('express');
var router = express.Router();

const multer = require('../helpers/multer')
const BannerController = require('../controllers/BannerController');
const middleware = require('../helpers/middleware');

/**
 * @swagger
 *  definitions:
 *      Banner:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              url_image:
 *                  type: string
 * 
 *              state:
 *                  type: boolean
 * 
 */


/**
 * @swagger
 * /api/banner:
 *  get:
 *      tags:
 *      - Banner
 *      summary: Obtiene todos los banners
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', BannerController.all);


/**
* @swagger
* /api/banner:
*  get:
*      tags:
*      - Banner
*      summary: Obtiene todos los banners
*      responses:
*          200:
*              description: Respuesta correcta 
*          400:
*              description: Error controlado
*          500:
*              description: Error en el servidor
*/
router.get('/admin', middleware.mdAuthorize, BannerController.allAdmin);

/**
 * @swagger
 * /api/banner/{id}:
 *  get:
 *      tags:
 *      - Banner
 *      summary: Obtiene un banner por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del banner a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, BannerController.show);

/**
 * @swagger
 * /api/banner:
 *  post:
 *      tags:
 *      - Banner
 *      summary: Inserta un banner nuevo
 *      parameters:
 *         - name: Banner
 *           description: Objeto Banner
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Banner'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, BannerController.create);

/**
 * @swagger
 * /api/banner/{id}:
 *  put:
 *      tags:
 *      - Banner
 *      summary: Actualiza un banner por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del banner para actualizar.
 *         - name: Banner
 *           description: Objeto Banner
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Banner'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, BannerController.update);

/**
 * @swagger
 * /api/banner/{id}:
 *  delete:
 *      tags:
 *      - Banner
 *      summary: Elimina un banner por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del banner para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, BannerController.remove);


module.exports = router;