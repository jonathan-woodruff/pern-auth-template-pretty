const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = require('../constants/index');
const db = require('../db/index');

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => { //This is the callback function that google will call upon authentication. accessToken is what you use to access Google's API. Since accessToken expires after a day or two, refreshToken is used to request another accessToken. profile contains the info we told Google to get for us using scopes

    const email = profile.emails[0].value;
    const googleId = profile.id;
    req.user = { user_email: email };

    try {
        //check if user already has an sso account
        let q = await db.query(`SELECT email FROM users WHERE email = $1 AND google_id = $2`, [email, googleId]);
        if (q.rows.length) {
            return done(null, profile);
        }
        q = await db.query(`SELECT email FROM users WHERE email = $1`, [email]);
        if (q.rows.length) {
            await db.query(`UPDATE users SET google_id = $1 WHERE email = $2`, [googleId, email]);
            return done(null, profile);
        } else {
            await db.query(`INSERT INTO users (email, google_id) VALUES ($1, $2)`, [email, googleId]);
            return done(null, profile);
        }
    } catch(error) {
        console.log(error.message);
        done(error, null);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});