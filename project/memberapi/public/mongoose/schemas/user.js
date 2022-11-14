const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {Schema} = mongoose;

const usersSchema = new Schema({
    name: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,  
    },
});

const User = mongoose.model('user', usersSchema);

module.exports = User;