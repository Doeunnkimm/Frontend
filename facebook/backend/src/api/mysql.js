const mysql = require('mysql');
const { connect } = require('.');

const conn = {
  // 연결 설정 정보
  host: '127.0.0.1',
  port: '3310',
  user: 'root',
  password: '1234',
  database: 'facebook',
};

const Maria = {};

Maria.selectUsers = (param, callback) => {
  // 1. DB 커넥션 생성
  const connection = mysql.createConnection(conn);

  // 2. DB 접속 시작
  connection.connect();

  // 3. DB 쿼리(사용자 정보 가져오기)
  const sql = 'select * from users';
  console.log(sql);

  connection.query(sql, (err, result, fields) => {
    if (err) {
      console.trace(err);
    } else {
      console.log(result);

      // 4. 결과 반환
      callback(result);

      // 5. 종료
      connection.end();
    }
  });
};

module.exports = Maria;
