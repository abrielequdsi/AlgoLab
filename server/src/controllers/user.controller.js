const db = require("../models");
const User = db.user;
const Role = db.role;

const getStudents = async (req, res) => {
    try {
        const students = await User.findAll({
            include: {
                model: Role,
                where: { name: "student" },
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        res.status(200).json({
            status: true,
            message: "All students",
            data: students,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
const getTeachers = async (req, res) => {
    const teachers = await User.findAll({
        include: {
            model: Role,
            where: { name: "teacher" },
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });
    res.status(200).json({
        status: true,
        message: "All teachers",
        data: teachers,
    });
};
const getAdmins = async (req, res) => {
    const admins = await User.findAll({
        include: {
            model: Role,
            where: { name: "admin" },
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });
    res.status(200).json({
        status: true,
        message: "All admins",
        data: admins,
    });
};
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
                model: Role,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        res.status(200).json({
            status: true,
            message: "All users",
            data: users,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({
            status: true,
            message: "All roles",
            data: roles,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
const postRole = async (req, res) => {
    try {
        const roles = await Role.findAll();
        const roleId = roles.length + 1;
        const role = await Role.create({
            id: roleId,
            name: req.body.name,
        });
        res.status(200).json({
            status: true,
            message: "All roles",
            data: role,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
const getUserSolvedQuestion = async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await User.findOne({
            where: { id: userId },
        });
        res.status(200).json({
            status: true,
            message: "Get user solved question",
            data: user.solvedQuestion,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getStudents,
    getTeachers,
    getAdmins,
    getUsers,
    getRoles,
    postRole,
    getUserSolvedQuestion,
};
