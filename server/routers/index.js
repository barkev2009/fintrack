const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const receiptRouter = require('./receiptRouter');
const statementRouter = require('./statementRouter');

router.use('/user', userRouter);
router.use('/receipt', receiptRouter);
router.use('/statement', statementRouter);

module.exports = router;