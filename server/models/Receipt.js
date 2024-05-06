const mongoose = require('mongoose');

const Receipt = mongoose.Schema(
    {
        createDate: Date,
        updateDate: Date,
        userLogin: String,
        payload: Object
    }
);
module.exports = mongoose.model('Receipt', Receipt);