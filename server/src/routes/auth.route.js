const { verifyRegister } = require("../middleware");
const controller = require("../controllers/auth.controller");

const authRoutes = (router) => {
    // Middleware
    router.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Routes
    router.post(
        "/register",
        [
            verifyRegister.checkDuplicateUsernameOrEmail,
            verifyRegister.checkRolesExisted,
        ],
        controller.signup
    );
    router.post("/login", controller.login);
};

module.exports = authRoutes;
