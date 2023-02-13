const User = require('../models/user');
const local = require('./local');
const passport = require('passport');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id } });
            done(null, user);
        } catch (err) {
            console.log(err);
            done(err);
        }
    });
    local();
};
