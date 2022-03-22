const router = require("express").Router();

router.use("/test", require("./test.route"));
router.use("/auth", require("./auth.route"));
router.use("/codeRun", require("./codeRun.route"));

module.exports = router;
