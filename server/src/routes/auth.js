const { Router } = require('express');
const router = Router();
const { getUsers, register, login, protected, logout, loginFailed, loginSuccess } = require('../controllers/auth');
const { 
    registerValidation, 
    loginValidation
} = require('../validators/auth');
const { validationMiddleware } = require('../middlewares/validation-middleware');
const { userAuth } = require('../middlewares/auth-middleware');
const { ssoAuth } = require('../middlewares/sso-auth-middleware');
const passport = require('passport');

router.get('/get-users', getUsers);
router.get('/protected', userAuth, protected);
router.get('/protected-sso', protected);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout);
router.get('/login/failed', loginFailed);
router.get('/login/success', loginSuccess);
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: '/auth/login/failed'
}));
//router.get('/google-client-id', getGoogleClientId);
//router.post('/sso', sso)
//router.post('/request-reset', requestResetValidation, validationMiddleware, requestReset);
//router.put('/password-reset', passwordResetValidation, validationMiddleware, resetPassword);

module.exports = router;