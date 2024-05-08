const { statuses } = require("../utils/consts")

module.exports = function (resp, status, message) {
    let statusCode;
    switch (status) {
        case statuses.UNAUTHORIZED:
            statusCode = 401;
            break;
        case statuses.FORBIDDEN:
            statusCode = 403;
            break;
        case statuses.BAD_REQUEST:
            statusCode = 404;
            break;
        case statuses.INTERNAL:
        default:
            statusCode = 500;
            break;
    }
    return resp.status(statusCode).json({ message })
}