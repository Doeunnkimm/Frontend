"use strict";

const fs = require("fs").promises;

class UserStorage{

    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;
        const newUsers = fields.reduce((newUsers, filed) => {
            if (users.hasOwnProperty(filed)) {
                newUsers[filed] = users[filed];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    // 은닉화된 데이터를 가져오도록 하는 메소드
    static getUsers(isAll, ...fields) {
        return fs
            .readFile("public/db/users.json")
            .then((data) => {
                return this.#getUsers(data, isAll, fields);
            })
            .catch(console.error);
    }

    static getUsersInfo(id) {
        // const users = this.#users;
        return fs
            .readFile("public/db/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch(console.error);
    }
}

module.exports = UserStorage;