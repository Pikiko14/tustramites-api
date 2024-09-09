var express = require('express');
var router = express.Router();

const StorageController = require('../controllers/StorageController');


/**
 * @swagger
 * /api/storage:
 *  post:
 *      tags:
 *      - Storage
 *      summary: Inserta una solicitud de llamada nueva
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
router.get('/', StorageController.show);

router.get('/download', StorageController.download);




module.exports = router;