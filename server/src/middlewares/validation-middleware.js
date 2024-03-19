/* Take the validation variables from validators/auth.js and plug them here to return any issues */

const { validationResult } = require('express-validator');

exports.validationMiddleware = (req, res, next) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    next();
};