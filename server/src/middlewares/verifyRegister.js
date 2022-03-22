const db = require("../models");
const Role = db.role;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Username
    const user = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (user) {
        res.status(400).send({
            message: "Failed! Username is already in use!",
        });
        return;
    }

    // Email
    const email = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (email) {
        res.status(400).send({
            message: "Failed! Email is already in use!",
        });
        return;
    }
    next();
};

const checkRolesExisted = async (req, res, next) => {
    // NEED TO BE FIXED IN THE FUTURE
    // NOW, ROLES IN ARRAY. ASSUMING USER CAN HAVE MULTIPLE ROLES
    // CHANGE JUST ONE ROLE ONLY IN THE FUTURE
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            const role = await Role.findOne({
                where: {
                    name: req.body.roles[i],
                },
            });
            if (!role) {
                res.status(400).send({
                    message:
                        "Failed! Role does not exist = " + req.body.roles[i],
                });
                return;
            }
        }
    }

    next();
};
const verifyRegister = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted,
};
module.exports = verifyRegister;
