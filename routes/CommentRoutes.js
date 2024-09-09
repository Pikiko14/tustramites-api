var express = require('express');
var router = express.Router();

const multer = require('../helpers/multer')
const CommentController = require('../controllers/CommentController');
const middleware = require('../helpers/middleware');

/**
 * @swagger
 *  definitions:
 *      Comment:
 *          type: object
 *          properties:
 *              fullname:
 *                  type: string
 *              position_company:
 *                  type: string
 *              comment:
 *                  type: string
 *              url_image:
 *                  type: string 
 *              state:
 *                  type: boolean
 * 
 */


/**
 * @swagger
 * /api/Comment:
 *  get:
 *      tags:
 *      - Comment
 *      summary: Obtiene todos los comentarios
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', CommentController.all);

/**
 * @swagger
 * /api/comment/{id}:
 *  get:
 *      tags:
 *      - Comment
 *      summary: Obtiene un comentario por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del comentario a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, CommentController.show);

/**
 * @swagger
 * /api/comment:
 *  post:
 *      tags:
 *      - Comment
 *      summary: Inserta un comentario nuevo
 *      parameters:
 *         - name: Comment
 *           description: Objeto Comment
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Comment'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', middleware.mdAuthorize, CommentController.create);

/**
 * @swagger
 * /api/comment/{id}:
 *  put:
 *      tags:
 *      - Comment
 *      summary: Actualiza un comentario por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del comentario para actualizar.
 *         - name: Comment
 *           description: Objeto Comment
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Comment'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, CommentController.update);

/**
 * @swagger
 * /api/comment/{id}:
 *  delete:
 *      tags:
 *      - Comment
 *      summary: Elimina un comentario por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del comentario para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, CommentController.remove);


module.exports = router;