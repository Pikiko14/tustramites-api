var express = require('express');
var router = express.Router();
const middleware = require('../helpers/middleware');

const NotificationController = require('../controllers/NotificationNewController');

/**
 * @swagger
 *  definitions:
 *      NotificationNew:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              message:
 *                  type: string
 *              created_at:
 *                  type: string
 *                  format: date
 *              view:
 *                  type: boolean
 *              _from:
 *                  type: object
 *              _to: 
 *                  type: object
 *      Refresh:
 *          type: object
 *          properties:
 *              token: 
 *                  type: string
 * 
 */


/**
 * @swagger
 * /api/notification-new:
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
 router.get('/all', middleware.mdAuthorize, NotificationController.getAll);


 /**
 * @swagger
 * /api/notification-new:
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

router.put('/:id', middleware.mdAuthorize, NotificationController.view_update_one);
router.put('/update/:id', middleware.mdAuthorize, NotificationController.update_notificacion);



/**
 * @swagger
 * /api/notification-new:
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
 *              $ref: '#/definitions/NotificationNew'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
 router.post('/', middleware.mdAuthorize, NotificationController.create);



router.delete('/:id', middleware.mdAuthorize, NotificationController.remove);

module.exports = router;