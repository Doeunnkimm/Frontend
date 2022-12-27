// 테이블에 대한 정보와 config에 대한 정보를 모아서
// sequelize라는 객체를 만드는데 이 객체를 app.js에 가져가서
// 쓸 예정

const Sequelize = require('sequelize');
const config = require('../config/config');
const env = 'development'; // cross-env를 활용하여 배포용일 때는 production으로 적용
// cross-env : 명령어에 따라 달라지게 .env를 등록해줌
const dbconfig = config[env]; // config.js의 development 설정 = 개발용 데베 가져왔다
// dbconfig에는 confing.js에서 development의 정보들이 들어있음

// 만든 user 테이블 정보 가져오기
const user = require('./user');

const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password,
    dbconfig
);
const db = {};

db.User = user;
Object.keys(db).forEach(name => {
    db[name].init(sequelize);
});

// 객체 값 채워주기
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
