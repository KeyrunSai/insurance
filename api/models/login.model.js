const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

module.exports = Login = mongoose.model("Login", loginSchema);