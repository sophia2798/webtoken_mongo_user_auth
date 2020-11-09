const db = require("../models");
const ACCOUNTS = db.ACCOUNTS;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Email already in use! Please choose another." });
            return;
        }

        next();
    });
};

checkAccountsExisted = (req, res, next) => {
    if (req.body.accounts) {
        for (var i=0; i<req.body.accounts.length; i++) {
            if (!ACCOUNTS.includes(req.body.accounts[i])) {
                res.status(400).send({
                    message: `Failed! ${req.body.accounts[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateEmail,
    checkAccountsExisted,
};

module.exports = verifySignUp;