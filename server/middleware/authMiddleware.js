const jwt = require('jsonwebtoken');
const respError = require('../error/respError');
const { statuses } = require('../utils/consts');

module.exports = function (req, resp, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer TOKEN
        if (!token) {
            return respError(resp, statuses.UNAUTHORIZED, 'Не авторизован');
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded
        next()
    } catch (error) {
        return respError(resp, statuses.FORBIDDEN, 'Неверный токен');
    }
}