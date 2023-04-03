const express = require('express');
const db = require('./models/index');
const user = require('./routes/user');
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('DB연결 성공 !');
  })
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(defaultUrl, router)
app.use('/user', user);

app.listen(9000, () => {
  console.log('9000번으로 서버 실행 중 :D');
});
