const User = require('../models/User');
const { genSalt, hash } = require("bcryptjs");

const execute = async function (req, res, next) {
    try{

        const salt = await genSalt(10);
        const hashPassword = await hash("tuexperto2020*", salt);

        const user = new User({
            first_name: "Bernardo Alexander",
            last_name: "Zuluaga Aristizabal",
            email: "admin@tuexpertolegal.com",
            password: hashPassword,
            created_at: new Date(),
            verify: true,
            role: 'AD'
        })

        await user.save();
        
        res.status(201).json({
            code: "OK",
            message: "Migracion ejecutada correctamente.",
        });

    }catch(err){
        next({
            code: 500,
            message: err.message
        })
    }
}

module.exports = {
    execute
};
  