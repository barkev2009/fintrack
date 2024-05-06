const { UNAUTHORIZED, FORBIDDEN, BAD_REQUEST, INTERNAL } = require("../utils/consts")

module.exports = function (resp, status, message) {
    let statusCode;
    switch (status) {
        case UNAUTHORIZED:
            statusCode = 401;
            break;
        case FORBIDDEN:
            statusCode = 403;
            break;
        case BAD_REQUEST:
            statusCode = 404;
            break;
        case INTERNAL:
        default:
            statusCode = 500;
            break;
    }
    return resp.status(statusCode).json({ message })
}