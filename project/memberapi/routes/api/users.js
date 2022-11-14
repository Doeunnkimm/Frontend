const express = require("express");
const mongoose = require("../../public/mongoose/index.js");
const User = require("../../public/mongoose/schemas/user.js");
const router = express.Router();
const bcrypt = require("bcrypt");

mongoose.connect();

router.get("/", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send(users);
});

router.post("/", async (req, res) => {
  const { name, password } = req.body;
  try {
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ message: "이미 존재하는 아이디입니다!" });
    }

    user = new User({
      name,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.post("/login", async (req, res) => {
  let { name, password } = req.body;
  let user = await User.findOne({ name });
  if (user) {
    // 입력한 아이디가 db에 있다면
    compareResult = await bcrypt.compareSync(password, user.password); // 비밀번호를 비교
    console.log(compareResult); // true or false
    if (compareResult) {
      return res.send({ success: true });
    }
    return res.send({ success: false, message: "비밀번호가 틀렸습니다" });
  }
  return res.send({ success: false, message: "등록되지 않은 아이디입니다" });
});

module.exports = router;
