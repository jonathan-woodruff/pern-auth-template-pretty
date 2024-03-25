/*
const express = require('express');
const passport = require('passport');
const router = express.Router();

const successLoginURL = 'http://localhost:3000/login/success';
const errorLoginURL = 'http://localhost:3000/login/error';

//this route is for google sso
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/dashboard', passport.authenticate(
    'google', {
        failureMessage: 'Cannot login to Google. Please try again later!',
        failureRedirect: errorLoginURL,
        successRedirect: successLoginURL
    }),
    (req, res) => {
        console.log('User: ', req.user);
        res.send('Thank you for signing in!');
    }
);

module.exports = router;
*/