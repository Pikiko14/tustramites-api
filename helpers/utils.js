var jwt = require("jsonwebtoken");
var moment = require("moment");

module.exports = {
  genarteToken(data, time, type) {
    var payload = {
      data: data,
      iat: moment().unix(),
      exp: moment().add(time, type).unix(),
    };
    return jwt.sign(payload,  process.env.SECRECT);
  }
};
