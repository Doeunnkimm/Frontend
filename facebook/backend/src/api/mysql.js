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

Maria.findUser = (params) => {
  return new Promise((resolve, reject) => {
    // 1. DB 커넥션 생성
    const connection = mysql.createConnection(conn);

    // 2. DB접속 시작
    connection.connect();

    // 3. DB 쿼리(사용자 검색)
    const { userid, password } = params;
    const sql =
      ' select * from users where ' +
      ` userid = "${userid}" and password="${password}"; `;
    console.log(sql);

    connection.query(sql, (err, result) => {
      if (err) {
        console.trace(err);
        reject();
      } else {
        // 4. DB 연결 종료
        connection.end();
        resolve(result);
      }
    });
  });
};

Maria.insertUser = (params) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(conn);
    connection.connect();

    const { userid, password, email, year, month, day, gender } = params;
    const birthday = year + month + day;
    const sql = `insert into users (userid, password, email, birthday, gender, updatetime, createtime) values ('${userid}', '${password}', '${email}', '${birthday}', '${gender}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;

    console.log(sql);

    connection.query(sql, (err, results) => {
      if (err) {
        console.trace(err);
        reject(err);
      } else {
        connection.end();
        resolve(results);
      }
    });
  });
};

Maria.checkUser = (params) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(conn);
    connection.connect();

    const { userid } = params;
    const sql = `select * from users where userid='${userid}';`;

    connection.query(sql, (err, results) => {
      if (err) {
        console.trace(err);
        reject(err);
      } else {
        connection.end();
        resolve(results);
      }
    });
  });
};

module.exports = Maria;
