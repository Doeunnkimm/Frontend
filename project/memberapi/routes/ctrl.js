const fs = require("fs");
const User = require("../public/models/User");
const UserStorage = require("../public/models/UserStorage");
const bcrypt = require("bcrypt");

const output = {
    hello: (req,res) => {
        fs.readFile("./views/index.html", (err, data) => {
            if (err) {
              res.send("error");
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              res.end();
            }
          });
    },

    login: (req,res) => {
        fs.readFile("./views/login.html", (err, data) => {
            if (err) {
              res.send("error");
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              res.end();
            }
          });
    },

    main: (req,res) => {
        fs.readFile("./views/main.html", (err, data) => {
            if (err) {
              res.send("error");
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              res.end();
            }
          });
    },

    signup: (req,res) => {
        fs.readFile("./views/signup.html", (err, data) => {
            if (err) {
              res.send("error");
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              res.end();
            }
          });
    }
};

const users = UserStorage.getUsers("id", "password");

const process = {
    login: async(req,res) => {
      const user = new User(req.body);
      const response = await user.login();
      return res.json(response);
    },
    
    signup: async(req,res) => {
      const user = new User(req.body);
      const response = await user.signup();
      return res.json(response);
    }
}

module.exports = {
    output,
    process,
};