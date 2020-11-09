const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Account = db.account;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.accounts) {
            Account.find(
                {
                    username: { $in: req.body.accounts }
                },
                (err, accounts) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.accounts = accounts.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User wwas registered successfully!" });
                    });
                }
            );
        } else {
            Account.findOne({ username: "Child 1" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.accounts = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .populate("accounts", "-__v")
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if(!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = [];

        for (var j=0; j<user.accounts.length; j++) {
            authorities.push("ACCOUNT_" + user.accounts[i].username.toUpperCase());
        }
        res.status(200).send({
            id: user._id,
            email: user.email,
            accounts: authorities,
            accessToken: token
        });
    });
};