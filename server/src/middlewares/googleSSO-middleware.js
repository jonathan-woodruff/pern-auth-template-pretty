const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = require('../constants/index');

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => { //This is the callback function that google will call upon authentication. accessToken is what you use to access Google's API. Since accessToken expires after a day or two, refreshToken is used to request another accessToken. profile contains the info we told Google to get for us using scopes

    done(null, profile);

    /*const userEmail = profile.emails[0].value;
    const googleId = profile.id;

    try {
        const { user } = await db.query(`SELECT email FROM users WHERE email = $1`, [userEmail]);
        if (!user.length) {
            await db.query(`INSERT INTO users (email, google_id) VALUES ($1, $2)`, [userEmail, googleId]);
        }
    } catch(error) {
        console.log(error.message);
        done(error, null);
    }

    if (user && user[0]) return done(null, user && user[0]);*/
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

/*
passport.deserializeUser(async (id, done) => {
    try {
        const { user } = await db.query(`SELECT user_id FROM users WHERE user_id = $1`, [id]);
    } catch(error) {
        console.log('Error deserializing: ', error);
        done(error, null);
    }

    console.log('Deserialized user: ', user);
    if (user) done(null, user);
    
});
*/