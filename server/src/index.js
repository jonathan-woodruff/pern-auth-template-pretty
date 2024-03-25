const express = require('express');
const app = express();
const { PORT, CLIENT_URL, COOKIE_KEY } = require('./constants/index');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');

//import passport middleware strategies
require('./middlewares/passport-middleware');
require('./middlewares/googleSSO-middleware');

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());
app.use(cookieSession({
    name: 'session',
    maxAge: 1000 * 60 * 60 * 24, //1 day
    keys: [COOKIE_KEY]
}));
app.use(passport.session()); //for google sso

//import routes
const authRoutes = require('./routes/auth');

//initialize routes
app.use('/auth', authRoutes);

//app start
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at http://localhost:${PORT} `)
        })
    } catch(error) {
        console.log(`Error: ${error.message}`)
    }
};

appStart();