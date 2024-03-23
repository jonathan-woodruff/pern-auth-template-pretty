const { Router } = require('express');
const router = Router();
const { getUsers, register, login, protected, logout, requestReset } = require('../controllers/auth');
const { registerValidation, loginValidation, requestResetValidation } = require('../validators/auth');
const { validationMiddleware } = require('../middlewares/validation-middleware');
const { userAuth } = require('../middlewares/auth-middleware');

router.get('/get-users', getUsers);
router.get('/protected', userAuth, protected);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout);
router.post('/request-reset', requestResetValidation, validationMiddleware, requestReset);

module.exports = router;