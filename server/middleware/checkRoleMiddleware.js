const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const respError = require('../error/respError');
const { UNAUTHORIZED, FORBIDDEN } = require('../utils/consts');

module.exports = function (role) {
    return function (req, resp, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer TOKEN
            if (!token) {
                return respError(resp, UNAUTHORIZED, 'Не авторизован');
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== role) {
                return respError(resp, FORBIDDEN, `Отказано в доступе для роли ${role}`);
            }
            req.user = decoded
            next()
        } catch (error) {
            return respError(resp, FORBIDDEN, `Неверный токен`);
        }
    }
} 