const passport = require('passport');

exports.userAuth = passport.authenticate('jwt', { session: false });  //now every time you use userAuth on a route, the route will be protected by the jwt token