const { verifyRegister } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const router = require("express").Router();

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
    controller.register
);

router.post("/login", controller.login);

module.exports = router;
