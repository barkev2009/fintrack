const ApiError = require('../error/ApiError');
const Statement = require('../models/Statement');
const tryCatchWrapper = require('../utils/tryCatchWrapper');


class StatementController {
    async create(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { createDate, descr, isIncome, docNumber, value, label, category } = req.body;
                let statement = await Statement.findOne({ docNumber });
                if (statement) {
                    return next(ApiError.badRequest(`Уже существует запись с номером документа: ${docNumber}`));
                }
                statement = new Statement({ createDate, descr, isIncome, docNumber, value, label, category });
                await statement.save();
                return resp.json({ statement })
            }, req, resp, next, 'StatementController.create'
        )
    }

    async edit(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { docNumber } = req.params;
                const { createDate, descr, isIncome, value, label, category } = req.body;
                let statement = await Statement.findOne({ docNumber });
                if (!statement) {
                    return next(ApiError.badRequest(`Не существует записи с номером документа: ${docNumber}`));
                }
                statement.createDate = createDate;
                statement.descr = descr;
                statement.isIncome = isIncome;
                statement.value = value;
                statement.label = label;
                statement.category = category;
                await statement.save();
                return resp.json({ statement })
            }, req, resp, next, 'StatementController.edit'
        )
    }
}

module.exports = new StatementController();