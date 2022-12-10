const express = require("express");
const router = express.Router();

// /api/login POST 데이터를 전달 받는다.
router.post("/login", (req, res) => {
  console.log("-------------> [POST]/api/login call !!!!");

  // POST -> body !!!!!!
  console.log(req.body);
  const [userid, password] = req.body;
  if (userid === "doeunn" && password === "1234") {
    res.send({ result: "success" });
  } else {
    res.send({ result: "fail" });
  }
});

// /api/regist POST 데이터를 전달 받는다.
router.post("/regist", (req, res) => {
  console.log("-------------> [POST]/api/login call !!!!");

  console.log(req.body);

  const { name, userid, password, year, month, day, gender } = req.body;

  if (name && userid && password && month && day && gender) {
    res.send({ result: "success" });
  } else {
    res.send({ result: "fail" });
  }
});

module.exports = router;
