const passport =  require('passport');

const GoogleStrategy =  require('./strategy/GoogleStrategy');
const FacebookStrategy =  require('./strategy/FacebookStrategy');

const User = require('../../models/User');

passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser(async function (req, id, done) {
    const user = await User.findOne({ id: id });

    var data = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    };
    done(null, data)
})

passport.use(GoogleStrategy);
passport.use(FacebookStrategy);

module.exports = passport;