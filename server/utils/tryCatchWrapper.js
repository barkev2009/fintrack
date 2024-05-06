const { validationResult } = require('express-validator');
const ApiError = require('../error/ApiError');

module.exports = function (func, req, res, next, funcName) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest({ function: funcName, message: 'Ошибка валидации', errors }))
        }
        func.apply(this, req, res, next)
    } catch (error) {
        return next(ApiError.internalError({ function: funcName, message: error.message }))
    }
}