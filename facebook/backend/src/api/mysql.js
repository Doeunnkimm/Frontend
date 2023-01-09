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

const queryFunc = (sql) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(conn);
    connection.connect();

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

Maria.findAccountid = (params) => {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(conn);
    connection.connect();

    const { email } = params;
    const sql = `select * from users where email='${email}';`;

    const result = await queryFunc(sql);
    resolve(result && result[0] ? result[0] : null);
  });

  // results라는 값이 있고 0번째 값이
  // 있다면 그 0번째를 넘기고
  // 없다면 null을 넘길거야
  // 배열이 아닌 object를 넘기게 됨 -> 키값으로 바로 값을 사용 가능해짐
  // resolve(results && results[0] ? results[0] : null);
};

Maria.deleteUser = (params) => {
  return new Promise(async (resolve) => {
    const connection = mysql.createConnection(conn);
    connection.connect();

    const { email, userid } = params;
    const sql = `delete from users where userid='${userid}' and email='${email}';`;

    const result = await queryFunc(sql);
    resolve(result && result.affectedRows === 1 ? true : false);

    // resolve(results && results.affectedRows === 1 ? true : false);
  });
};

Maria.checkUser = (params) => {
  return new Promise(async (resolve, reject) => {
    const { userid } = params;
    const sql = `select * from users where userid='${userid}';`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

Maria.insertUser = (params) => {
  return new Promise(async (resolve) => {
    const { userid, password, email, year, month, day, gender } = params;
    const birthday = year + month + day;
    const sql = `insert into users (userid, password, email, birthday, gender, updatetime, createtime) values ('${userid}', '${password}', '${email}', '${birthday}', '${gender}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

Maria.selectUsers = (param, callback) => {
  return new Promise(async (resolve) => {
    const sql = 'select * from users;';
    const result = await queryFunc(sql);
    resolve(result);
  });
};

Maria.findUser = (params) => {
  return new Promise(async (resolve) => {
    const { userid, password } = params;
    const sql =
      ' select * from users where ' +
      ` userid = "${userid}" and password="${password}"; `;
    const result = await queryFunc(sql);
    resolve(result);
  });
};

Maria.selectHome = (params) => {
  return new Promise(async (resolve) => {
    const sql = `select * from home;`;
    const result = await queryFunc(sql);
    resolve(result);
  });
};

Maria.updateLike = (params) => {
  return new Promise(async (resolve) => {
    const { likecount, homeid } = params;

    const sql = `update home set likecount=${
      likecount + 1
    } where homeid=${homeid};`;
    const result = await queryFunc(sql);
    resolve(result);
  });
};

Maria.findHome = (params) => {
  return new Promise(async (resolve) => {
    const { homeid } = params;

    const sql = `select * from home where homeid=${homeid};`;
    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 댓글 목록 조회
Maria.selectComment = (params) => {
  return new Promise(async (resolve) => {
    const { homeid } = params;
    const sql = `select * from comment where homeid=${homeid};`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 댓글 삽입
Maria.insertComment = (params) => {
  return new Promise(async (resolve) => {
    const { homeid, text } = params;

    const sql = `insert into comment (homeid, text) values(${homeid}, '${text}');`;
    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 댓글 삭제
Maria.deleteComment = (params) => {
  return new Promise(async (resolve) => {
    const { cmtid } = params;

    const sql = `delete from comment where cmtid=${cmtid};`;

    const result = await queryFunc(sql);
    resolve(result);
  });
};

// 댓글 갱신
Maria.updateComment = (params) => {
  return new Promise(async (resolve) => {
    const { cmtid, text } = params;

    const sql = `update comment set text='${text}' where cmtid=${cmtid};`;
    const result = await queryFunc(sql);
    resolve(result);
  });
};

module.exports = Maria;
