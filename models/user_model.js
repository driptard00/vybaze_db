const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
    phonenumber: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    is_active: {type: Number, required: true, default: 0},
}, {timeStamps: true});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel; 