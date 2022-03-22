const controller = require("../controllers/codeRun.controller");
const router = require("express").Router();

// Routes
// Can add middleware, if authenticated or not
router.post("/python", controller.codeRun);
router.put("/solvedQuestion", controller.solvedQuestion); // This endpoint should be added authentication in the future

module.exports = router;
