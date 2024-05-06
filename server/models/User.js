const mongoose = require('mongoose');

const User = mongoose.Schema(
    {
        login: String,
        email: String,
        password: String,
        twoFactor: String,
        role: {type: String, ref: 'Role'}
    }
);
module.exports = mongoose.model('User', User)