// 로그인 전략

const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const LocalStrategy = passportLocal.Strategy;

const passportConfig = {
    usernameField: 'email',
    passwordField: 'password',
};

const passportVerify = async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return done(null, false, {
                message: 'failure',
                error: '가입된 이메일이 없습니다',
            });
        }

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return done(null, user);
        } else {
            return done(null, false, {
                message: 'failure',
                error: '비밀번호가 올바르지 않습니다',
            });
        }
    } catch (err) {
        console.log(err);
        return done(err);
    }
};

module.exports = () => {
    passport.use('local', new LocalStrategy(passportConfig, passportVerify));
};
