const jwt = require('jsonwebtoken');

module.exports =  function (id, login, email, role) {
    let expiresIn = '7d';
    // if (role === 'ADMIN') {
    //     expiresIn = '1h';
    // }
    return jwt.sign(
        {
            id, login, email, role
        },
        process.env.SECRET_KEY,
        { expiresIn }
    )
}