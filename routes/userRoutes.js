var express = require('express');
var router = express.Router();
const middleware = require("../helpers/middleware");

const multer = require('../helpers/multer')
const UserController = require('../controllers/UserController');



/**
 * @swagger
 *  definitions:
 *      User:
 *          type: object
 *          properties:
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              verify:
 *                  type: boolean
 *              created_at:
 *                  type: date
 *              role:
 *                  type: string
 *              url_image:
 *                  type: string
 *              enterprise:
 *                  type: boolean
 *      Auth:
 *          type: object
 *          properties:    
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 */


/**
* @swagger
* /api/user/reload:
*  get:
*      tags:
*      - Reload
*      summary: Recarga la sesion
*      responses:
*          200:
*              description: Respues correcta 
*          400:
*              description: Error controlado
*          500:
*              description: Error en el servidor
*/
router.get('/reload', middleware.mdAuthorize, UserController.reload);


/**
 * @swagger
 * /api/user:
 *  get:
 *      tags:
 *      - User
 *      summary: Obtiene todos los usuarios
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', middleware.mdAuthorize, UserController.all);

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *      tags:
 *      - User
 *      summary: Obtiene un usuario por id
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: Id del usuario a consultar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/:id', middleware.mdAuthorize, UserController.show);

/**
 * @swagger
 * /api/user:
 *  post:
 *      tags:
 *      - User
 *      summary: Inserta un usuario nuevo
 *      parameters:
 *         - name: User
 *           description: Objeto User
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/User'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/', UserController.create);

/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *      tags:
 *      - User
 *      summary: Actualiza un usuario por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del usuario para actualizar.
 *         - name: User
 *           description: Objeto User
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/User'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/:id', middleware.mdAuthorize, UserController.update);

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *      tags:
 *      - User
 *      summary: Elimina un usuario por ID        
 *      parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: Id del usuario para eliminar.
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.delete('/:id', middleware.mdAuthorize, UserController.remove);

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      tags:
 *      - Login
 *      summary: Loguea un usuario
 *      parameters:
 *         - name: Auth
 *           description: Objeto Auth
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Auth'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/user/login/landing:
 *  post:
 *      tags:
 *      - Login
 *      summary: Loguea un usuario
 *      parameters:
 *         - name: Auth
 *           description: Objeto Auth
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Auth'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/login/landing', UserController.loginAux);

/**
 * @swagger
 * /api/user/client/all:
 *  get:
 *      tags:
 *      - User
 *      summary: Obtiene todos los usuarios de tipo cliente
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/client/all', middleware.mdAuthorize, UserController.allClients);


module.exports = router;