const db = require("../models");
const User = db.user;
const Role = db.role;

const getStudents = async (req, res) => {
    try {
        const students = await User.findAll({
            where: {
                username: req.body.username,
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
        where: {
            username: req.body.username,
        },
    });
    res.status(200).json({
        status: true,
        message: "All teachers",
        data: teachers,
    });
};
const getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            status: true,
            message: "All users",
            data: users,
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { getStudents, getTeachers, getAll };
