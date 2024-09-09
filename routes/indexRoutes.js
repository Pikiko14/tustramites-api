var express = require('express');
var router = express.Router();

const InitController = require('../controllers/InitController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tu Experto Legal' });
});

router.get('/setup', InitController.execute);

module.exports = router;