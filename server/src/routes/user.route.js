// const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const router = require("express").Router();

// Middleware
// router.use((req, res, next) => {
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
// });

// Routes
router.get("/students", controller.getStudents);
router.get("/teachers", controller.getTeachers);
router.get("/admins", controller.getAdmins);
router.get("/all", controller.getUsers);
router.get("/roles", controller.getRoles);
router.post("/postRole", controller.postRole);
// router.get("/student", [authJwt.verifyToken], controller.studentBoard);
// router.get(
//     "/teacher",
//     [authJwt.verifyToken, authJwt.isTeacher],
//     controller.teacherBoard
// );
// router.get(
//     "/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
// );

module.exports = router;
