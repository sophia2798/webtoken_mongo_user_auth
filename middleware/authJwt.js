const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Account = db.account;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config-secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });

    isChild1 = (req, res, next) => {
        User.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            Account.find(
                {
                    _id: { $in: user.accounts }
                },
                (err, accounts) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    for (var i=0; i < accounts.length; i++) {
                        if (accounts[i].name === "Child 1") {
                            next();
                            return;
                        }
                    }

                    res.status(403).send({ message: "Require Child 1 Account!" });
                    return;
                }
            );
        });
    };
};

const authJwt = {
    verifyToken,
    isChild1
};

module.exports = authJwt;