var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const NotificationController = require('../controllers/NotificationController');

/**
 * @swagger
 *  definitions:
 *      Notification:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              message:
 *                  type: string
 *              user: 
 *                  type: string
 *      Refresh:
 *          type: object
 *          properties:
 *              token: 
 *                  type: string
 * 
 */


/**
 * @swagger
 * /api/notification:
 *  get:
 *      tags:
 *      - Notification
 *      summary: Obtiene todas las notificaciones
 *      responses:
 *          200:
 *              description: Respuesta correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
 router.get('/', middleware.mdAuthorize, NotificationController.list);


 /**
 * @swagger
 * /api/notification:
 *  put:
 *      tags:
 *      - Notification
 *      summary: Actualiza las vistas por ID        
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.put('/', middleware.mdAuthorize, NotificationController.view_update);

router.put('/id', middleware.mdAuthorize, NotificationController.view_update_one);



/**
 * @swagger
 * /api/notification:
 *  post:
 *      tags:
 *      - Notification
 *      summary: Cree una nueva notificacion
 *      parameters:
 *         - name: Notification
 *           description: Objeto Notification
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Notification'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
 router.post('/', middleware.mdAuthorize, NotificationController.create);


/**
 * @swagger
 * /api/notification/refresh_token:
 *  post:
 *      tags:
 *      - Notification
 *      summary: Cree una nueva notificacion
 *      parameters:
 *         - name: Refresh
 *           description: Objeto Refresh
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Refresh'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.post('/refresh_token', middleware.mdAuthorize, NotificationController.refreshToken);


router.delete('/id', middleware.mdAuthorize, NotificationController.remove);

module.exports = router;