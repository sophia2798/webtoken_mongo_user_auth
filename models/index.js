const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.account = require("./Account");

db.ACCOUNTS = ["Child 1", "Child 2"];

module.exports = db;