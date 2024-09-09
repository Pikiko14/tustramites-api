var express = require('express');
var router = express.Router();
const passport = require('passport');

const jwt = require('../helpers/Auth/jwt');
const MAX_AGE = 60 * 60 * 8

// CONTROLLERS
const AuthController = require('../controllers/AuthController');
const middleware = require('../helpers/middleware');

/**
 * @swagger
 *  definitions:
 *      Auth:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 * 
 *      Remember:
 *          type: object
 *          properties:    
 *              email:
 *                  type: string
 * 
 *      Restart:
 *          type: object
 *          properties:    
 *              password:
 *                  type: string
 * 
 */

/**
 * @swagger
 * /api/login:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Login de usuario
 *      parameters:
 *         - name: Login
 *           description: Objeto de login
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
router.post('/login', AuthController.login);

// AUTH GOOGLE
//router.post('/auth/login', AuthController.login);
//router.post('/auth/social', AuthController.social);
//router.get('/auth/verify', middleware.mdAuthorize, AuthController.verify);



router.get(
    '/auth/google',
    passport.authenticate('google', {
      session: false,
      scope: ["profile", "email"],
      accessType: "offline",
      approvalPrompt: "force"
    })
);
  
// callback url upon successful google authentication
router.get(
    '/auth/google/callback/',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        if(req.user) {

            var payload = {
                _id: req.user._id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email,
                role: req.user.role,
                enterprise: req.user.enterprise||"",
                phone: req.user.phone,
                name_enterprise: req.user.name_enterprise
            };

            const token = jwt.genarteToken(payload, 5, 'hours');

            /*res.cookie('token', token, {
                maxAge: MAX_AGE * 1000, 
                expires: new Date(Date.now() + MAX_AGE * 1000),
                secure: true, 
                domain: process.env.DOMAIN,
                sameSite: 'lax'
            })*/
            
            res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
            
        }
    }
);

router.get(
    '/auth/facebook',
    passport.authenticate('facebook')
);
  
// callback url upon successful google authentication
router.get(
    '/auth/facebook/callback/',
    passport.authenticate('facebook', { session: false }),
    (req, res) => {
        if(req.user) {

            const token = jwt.genarteToken(req.user, 8, 'hours');

            res.cookie('token', token, {
                maxAge: MAX_AGE * 1000, 
                expires: new Date(Date.now() + MAX_AGE * 1000),
                secure: true, 
                domain: process.env.DOMAIN,
                sameSite: 'lax'
            })
            res.redirect(process.env.CLIENT_URL);
        }
    }
);

/**
 * @swagger
 * /api/remember:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Reestablecer contraseña
 *      parameters:
 *         - name: email
 *           description: email
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Remember'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
 router.post('/remember', AuthController.remember);

 /**
 * @swagger
 * /api/remember/restart:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Reestablecer contraseña
 *      parameters:
 *         - name: password
 *           description: password
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Restart'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
  router.post('/remember/restart', middleware.mdAuthorize, AuthController.rememberRestart);

  /**
 * @swagger
 * /api/remember/restart/login:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Reestablecer contraseña
 *      parameters:
 *         - name: password
 *           description: password
 *           in:  body
 *           required: true
 *           type: string
 *           schema:
 *              $ref: '#/definitions/Restart'
 *      responses:
 *          200:
 *              description: Respues correcta 
 *          400:
 *              description: Error controlado
 *          500:
 *              description: Error en el servidor
 */
   router.post('/remember/restart/login', middleware.mdAuthorize, AuthController.rememberRestartLogin);

module.exports = router;