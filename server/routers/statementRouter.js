const Router = require('express');
const router = new Router();
const statementController = require('../controllers/statementController');

router.post('/', statementController.create);
router.put('/:docNumber', statementController.edit);

module.exports = router;