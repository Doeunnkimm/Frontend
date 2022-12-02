const mongoose = require("mongoose");

const connect = () => {
    if(process.env.NODE_ENV !== "production") {
        mongoose.set("debug", true);
    }

    mongoose.connect("mongodb://root:1234@localhost:27017/admin", {
        dbName: 'user',
    }, (error) => {
        if(error) {
            console.error("mongodb 연결 에러", error);
        } else {
            console.log("mongodb 연결 성공", "localhost:27017/admin")
        }
    }
    )
}

mongoose.connection.on("error", (error) => {
    console.error("mongodb 연결 에러", error);
})

mongoose.connection.on("disconnected", () => {
    console.error("mongodb 연결 종료됨");
    connect();
})

module.exports = {
    connect,
};