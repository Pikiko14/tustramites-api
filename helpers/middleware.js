var jwt = require('jsonwebtoken');
var moment = require('moment');

module.exports = {
    mdAuthorize(req, res, next) {

        if (!req.headers.authorization) {
            return res
                .status(403)
                .send({ message: "Usuario no autorizado" });
        }

        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt.verify(token, process.env.SECRECT);
        if (payload.exp <= moment().unix()) {
            return res
                .status(401)
                .send({ message: "La session ha expirado" });
        }

        req.decode = payload.data;
        if (!req.decode)
            req.decode = payload.user;
        next();
    }
}
