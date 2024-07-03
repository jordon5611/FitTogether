const { validationResult } = require('express-validator');
const { BadRequestError } = require('../errors');

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg).join(', ');

        throw new BadRequestError(errorMessages);
    }
    next(); // Continue to the next middleware or route handler
};

module.exports = validatorMiddleware;