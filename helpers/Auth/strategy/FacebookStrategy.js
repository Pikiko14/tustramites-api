const FacebookStrategyAuth = require('passport-facebook').Strategy;

const User = require('../../../models/User');

const FacebookStrategy = new FacebookStrategyAuth(
    {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.API_URL + "/api/auth/facebook/callback",
        profileFields: ["email", "name", "photos", "profileUrl"]
    },
    async (accessToken, refreshToken, profile, done) => {

        const email = profile.emails && profile.emails[0].value;

        let user = await User.findOne({ email: email });
        if (user) {
            return done(null, user);
        } else {
            user = new User({
                _id: profile.id,
                password: profile.id,
                first_name: profile.displayName,
                last_name: '',
                //nickname: email.substring(0, email.lastIndexOf("@")),
                email: email,
                url_image: profile.photos && profile.photos[0].value,
                verify: true,
                role:'CLIENTE'
            })

            await user.save();
            return done(null, user);
        }

        return done(null, null);
    }
);

module.exports = FacebookStrategy;
