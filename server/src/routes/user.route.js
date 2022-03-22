const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

const userRoutes = (router) => {
    // Middleware
    router.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Routes
    router.get("/all", controller.allAccess);
    router.get("/student", [authJwt.verifyToken], controller.studentBoard);
    router.get(
        "/teacher",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.teacherBoard
    );
    router.get(
        "/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};

module.exports = userRoutes;
