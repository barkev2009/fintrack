const mongoose = require('mongoose');

const Statement = mongoose.Schema(
    {
        createDate: Date,
        descr: String,
        isIncome: Boolean,
        docNumber: String,
        value: Number,
        label: String,
        category: String
    }
);
module.exports = mongoose.model('Statement', Statement);