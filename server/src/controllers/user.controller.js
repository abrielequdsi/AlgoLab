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
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    //     // res.status(200).send("Student Content.");
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
const getAll = async (req, res) => {
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
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { getStudents, getTeachers, getAdmins, getAll };
