const router = require("express").Router();

const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const codeRunRouter = require("./codeRun.route");
const questionRouter = require("./question.route");

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/codeRun", codeRunRouter);
router.use("/question", questionRouter);

module.exports = router;
