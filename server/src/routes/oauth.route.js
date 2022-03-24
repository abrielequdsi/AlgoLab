const controller = require("../controllers/oauth.controller");
const router = require("express").Router();
const cors = require("cors");

// Middleware
router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Routes
router.get("/", controller.authorise);
router.get("/callback", controller.callback);

module.exports = router;
