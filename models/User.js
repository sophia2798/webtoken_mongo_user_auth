const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = mongoose.model(
    "User",
    new Schema({
        username: {
            type: String,
            unique: true,
            required: "You must enter a username"
        },
        password: {
            type: String,
            required: "You must enter a password"
        }
    })
);

module.exports = User;