const dotenv = require('dotenv');
dotenv.config();
// 설치한 dotenv 파이브러리를 사용하겠다는 뜻

module.exports = {
    development: {
        username: 'root',
        password: process.env.DB_PASSWORD,
        database: 'test', // 가지고 있는 데이터베이스 이름 입력
        host: '127.0.0.1',
        port: '3306',
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: process.env.DB_PASSWORD,
        database: 'test',
        host: '127.0.0.1',
        port: '3306',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: process.env.DB_PASSWORD,
        database: 'test',
        host: '127.0.0.1',
        port: '3306',
        dialect: 'mysql',
    },
};
