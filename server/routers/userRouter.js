const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

router.post('/register', [
    check('login', 'Логин не должен быть пустым').notEmpty(),
    check('password', 'Пароль не должен быть пустым').notEmpty(),
    check('email', 'E-mail не должен быть пустым').notEmpty(),
    check('password', 'Пароль должен содержать не менее 4 символов и не более 10').isLength({min: 4, max: 10})
] , userController.register);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.checkAuth);

module.exports = router;