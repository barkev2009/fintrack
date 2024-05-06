const ApiError = require('../error/ApiError');
const Receipt = require('../models/Receipt');
const tryCatchWrapper = require('../utils/tryCatchWrapper');


class ReceiptController {
    async create(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { payload, createDate } = req.body;
                const userLogin = 'admin';
                const receipt = new Receipt({createDate, userLogin, payload});
                await receipt.save();
                return resp.json({ receipt })
            }, req, resp, next, 'ReceiptController.create'
        )
    }

    async getByLogin(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { userLogin } = req.params;
                const receipts = await Receipt.find({userLogin});
                return resp.json({ receipts })
            }, req, resp, next, 'ReceiptController.getByLogin'
        )
    }    
}

module.exports = new ReceiptController();