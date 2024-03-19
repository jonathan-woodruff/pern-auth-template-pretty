const { Router } = require('express');
const router = Router();
const { getUsers, register } = require('../controllers/auth');
const { registerValidation } = require('../validators/auth');
const { validationMiddleware } = require('../middlewares/validation-middleware');

router.get('/get-users', getUsers);
router.post('/register', registerValidation, validationMiddleware, register);

module.exports = router;