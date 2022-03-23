const db = require("../models");
const config = require("../configs/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const register = async (req, res) => {
    try {
        // Save User to Database
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            solvedQuestion: [],
        });

        // Check if roles are specified
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });
            await user.setRoles(roles);
            res.status(201).json({
                status: true,
                message:
                    "User was registered successfully with specified roles!",
                data: user,
            });
        } else {
            // user role = 1
            // If client doesn't specify role, assign to student
            await user.setRoles([1]);
            res.status(201).json({
                status: true,
                message: "User was registered successfully as a Student!",
                data: user,
            });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        // Check User
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(404).send({ message: "Email does not exist!" });
        }

        // Check Password
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }

        // Get Roles
        const authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push(roles[i].name.toLowerCase());
        }

        // Generate Token
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).json({
            status: true,
            message: "Login success!",
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
            },
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { register, login };
