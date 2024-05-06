const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const generateJWT = require('../utils/generateJWT');
const User = require('../models/User');
const Role = require('../models/Role');


class UserController {
    async register(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { login, password, email } = req.body;
                let { role } = req.body;
                if (!role) {
                    role = 'USER';
                }

                const candidate = await User.findOne({ login });
                if (candidate) {
                    return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
                }

                const hashPassword = await bcrypt.hash(password, 7);
                const twoFactor = String(Math.floor(Math.random() * 1000000));
                const hash2FA = await bcrypt.hash(twoFactor, 7);
                const userRole = await Role.findOne({ value: role });
                if (!userRole) {
                    return next(ApiError.badRequest(`Не существует роли со значением ${role}`));
                }
                const user = new User({ login, password: hashPassword, role: userRole.value, email, twoFactor: hash2FA });
                await user.save();
                const token = generateJWT(user._id, user.login, user.email, user.role);

                return resp.json({ token, twoFactor })
            }, req, resp, next, 'UserController.register'
        )
    }

    async login(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const { login, password } = req.body;
                const candidate = await User.findOne({ login });

                if (!candidate) {
                    return next(ApiError.internalError('Пользователь не найден'))
                }

                let comparePassword = bcrypt.compareSync(password, candidate.password);
                if (!comparePassword) {
                    return next(ApiError.internalError('Неверный пароль'))
                }

                const token = generateJWT(candidate._id, candidate.login, candidate.email, candidate.role);
                return resp.json({ token })
            }, req, resp, next, 'UserController.login'
        )
    }

    async checkAuth(req, resp, next) {
        tryCatchWrapper(
            async () => {
                const token = generateJWT(req.user._id, req.user.login, req.user.email, req.user.role);
                return resp.json({ token })
            }, req, resp, next, 'UserController.checkAuth'
        )
    }
}

module.exports = new UserController();