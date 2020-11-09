const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = mongoose.model(
    "User",
    new Schema({
        email: {
            type: String,
            unique: true,
            required: "You must enter an email"
        },
        password: {
            type: String,
            required: "You must enter a password"
        },
        accounts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Account"
            }
        ]
    })
);

module.exports = User;