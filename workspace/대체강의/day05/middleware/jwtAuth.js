const passport = require('passport');

const jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: 'failure' });
        }

        next();
    })(req, res, next);
};

module.exports = jwtAuth;
