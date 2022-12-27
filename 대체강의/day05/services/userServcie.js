const { response } = require('express');
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

const UserService = {
    async login(req, res, next) {
        await passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (info) {
                return res.status(400).json(info);
            }

            return req.login(user, async (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }

                const token = jsonWebToken.sign({ id: user.id }, 'secret');
                res.status(200).json({ message: 'success', data: { token } });
            });
        })(req, res, next);
    },

    logout(req, res, next) {
        try {
            req.logout((err) => {
                if (err) {
                    next(err);
                    return res.status(400).json({ message: 'failure' });
                }

                req.session.destroy();
                res.clearCookie('connect.sid');
                res.status(200).json({ message: 'success' });
            });
        } catch (err) {
            next(err);
        }
    },

    async signup(req, res, next) {
        try {
            const exUser = await User.findOne({
                where: { email: req.body.email },
            });
            if (exUser) return res.status(400).send('이미 가입된 이메일입니다.');
            const hashPassword = await bcrypt.hash(req.body.password, 12);
            await User.create({
                email: req.body.email,
                password: hashPassword,
            });
            res.status(200).json({ message: 'success' });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = UserService;
