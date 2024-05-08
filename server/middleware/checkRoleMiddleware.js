const jwt = require('jsonwebtoken');
const respError = require('../error/respError');
const { statuses } = require('../utils/consts');

module.exports = function (role) {
    return function (req, resp, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer TOKEN
            if (!token) {
                return respError(resp, statuses.UNAUTHORIZED, 'Не авторизован');
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== role) {
                return respError(resp, statuses.FORBIDDEN, `Отказано в доступе для роли ${role}`);
            }
            req.user = decoded
            next()
        } catch (error) {
            return respError(resp, statuses.FORBIDDEN, `Неверный токен`);
        }
    }
} 