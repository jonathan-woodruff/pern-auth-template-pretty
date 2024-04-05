const passport = require('passport');

exports.ssoAuth = passport.authenticate('google', { scope: ['profile', 'email'] }); 