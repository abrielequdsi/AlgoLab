const controller = require("../controllers/question.controller");
const router = require("express").Router();

// Routes
router.post("/postQuestion", controller.postQuestion);

module.exports = router;
