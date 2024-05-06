const ApiError = require('../error/ApiError');
const respError = require('../error/respError');
const { INTERNAL } = require('../utils/consts');

module.exports = function (error, req, resp, next) {
    if (error instanceof ApiError) {
        return resp.status(error.status).json({message: error.message})
    }
    return respError(resp, INTERNAL, error.message);
}