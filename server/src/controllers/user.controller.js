const allAccess = async (req, res) => {
    res.status(200).send("Public Content.");
};
const studentBoard = async (req, res) => {
    res.status(200).send("Student Content.");
};
const teacherBoard = async (req, res) => {
    res.status(200).send("Teacher Content.");
};
const adminBoard = async (req, res) => {
    res.status(200).send("Admin Content.");
};
