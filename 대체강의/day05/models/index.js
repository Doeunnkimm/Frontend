const Sequelize = require('sequelize');
const config = require('../config/config');
const user = require('./user');
const todo = require('./todo');

const env = 'development';
const dbconfig = config[env];

const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig);

const db = {};

db.User = user;
db.Todo = todo;

Object.keys(db).forEach((name) => {
    db[name].init(sequelize);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
