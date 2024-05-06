const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const receiptRouter = require('./receiptRouter');

router.use('/user', userRouter);
router.use('/receipt', receiptRouter);

module.exports = router;