const router = require("express")();

const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const codeRunRouter = require("./codeRun.route");

router.use("/testUser", userRouter);
router.use("/auth", authRouter);
router.use("/codeRun", codeRunRouter);

module.exports = router;
