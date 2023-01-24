const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/user');

const JwtStrategy = Strategy;

const JwtConfig = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'secret',
};

const JwtVerify = async (jwtPayload, done) => {
    try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        if (user) {
            return done(null, user);
        } else {
            done(null, false, '올바르지 않은 인증정보 입니다');
        }
    } catch (err) {
        console.error(err);
        done(err);
    }
};

module.exports = () => {
    passport.use('jwt', new JwtStrategy(JwtConfig, JwtVerify));
};
