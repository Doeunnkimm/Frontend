const express = require("express");
const router = express.Router();

const ctrl = require("./ctrl.js");

/* GET home page. */
router.get("/", ctrl.output.hello);

router.get("/login", ctrl.output.login);

router.get("/main", ctrl.output.main);

router.get("/signup", ctrl.output.signup);

router.post("/signup", ctrl.process.signup);

router.post("/login", ctrl.process.login);

module.exports = router;
