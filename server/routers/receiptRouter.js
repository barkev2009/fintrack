const Router = require('express');
const router = new Router();
const receiptController = require('../controllers/receiptController');

router.post('/', receiptController.create);
router.get('/byLogin/:userLogin', receiptController.getByLogin);

module.exports = router;