const jwt = require('jsonwebtoken');
const moment = require('moment');  

module.exports = {
    genarteToken(data, time, type){
        var payload = {
            user: data,
            iat: moment().unix(),
            exp: moment().add(time, type).unix(),
        }
        return jwt.sign(payload, process.env.SECRECT);
    }
}
