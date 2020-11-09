const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Account = mongoose.model(
    "Account",
    new Schema({
        username: {
            type: String,
            unique: true,
            required: "You must enter a username"
        }
    })
);

module.exports = Account;