const mongoose = require('mongoose');

const Role = mongoose.Schema(
    {
        value: {type: String, default: 'USER'}
    }
);
module.exports = mongoose.model('Role', Role);