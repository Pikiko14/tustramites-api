const GoogleStrategyOauth = require('passport-google-oauth20');

const User = require('../../../models/User');

const GoogleStrategy = new GoogleStrategyOauth(
    {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.API_URL + "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {

        const email = profile.emails && profile.emails[0].value;

        let user = await User.findOne({ email: email });
        if (user) {
            return done(null, user);
        } else {
            user = new User({
                password: profile.id,
                first_name: profile.displayName,
                last_name: '',
                email: email,
                url_image: profile.photos && profile.photos[0].value,
                verify: true,
                role: 'CLIENTE',
                enterprise:false,
                phone:'',
                name_enterprise:''
            })

            await user.save();
            return done(null, user);
        }

        return done(null, null);
    }
);

module.exports = GoogleStrategy;
