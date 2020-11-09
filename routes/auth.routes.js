const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = fuction(app) {
    app.use(function(res, req, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/signup",
    [
        verifySignUp.checkDuplicateEmail,
        verifySignUp.checkAccountsExisted
    ], controller.signup);

    app.post("/api/auth/signin", controller.signin);
};