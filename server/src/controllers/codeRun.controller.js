const db = require("../models");
const config = require("../configs/auth.config");
const { PythonShell } = require("python-shell");

const User = db.user;
const Op = db.Sequelize.Op;

const codeRun = (req, res) => {
    try {
        // fs.writeFileSync("python/program.py", req.body.code);
        const code = req.body.code;
        const testCases = req.body.testCases;

        const codeRunDebug = [];
        const codeRunOutput = [];

        const promises = [];

        testCases.map((testCase) => {
            promises.push(
                new Promise((resolve, reject) => {
                    PythonShell.runString(
                        code,
                        {
                            mode: "text",
                            pythonOptions: ["-u"],
                            args: [...testCase["input"]], // Input Arguments
                        },
                        (err, results) => {
                            if (err) {
                                codeRunDebug.push(null);
                                codeRunOutput.push(String(err));
                            } else {
                                codeRunDebug.push(results.slice(0, -1));
                                codeRunOutput.push(...results.slice(-1));
                            }
                            // If the promise is resolved it will return value "isResolved"
                            resolve("isResolved");
                        }
                    );
                })
            );
        });

        Promise.all(promises).then((values) => {
            // Check if all promise in promises array is resolved yet
            // If everything is resolved,
            // the codeRunDebug & codeRunOutput must also already resolved too
            console.log(codeRunDebug);
            console.log(codeRunOutput);
            res.status(200).json({
                status: true,
                message: "Code Run Success!",
                data: { codeRunDebug, codeRunOutput },
            });
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const solvedQuestion = async (req, res) => {
    try {
        const userId = req.body.id;
        const solvedQuestionNum = req.body.solvedQuestionNum;
        const user = await User.findOne({
            where: { id: userId },
        });
        const solvedQuestion = user.solvedQuestion;

        if (solvedQuestion.includes(solvedQuestionNum)) {
            res.status(200).json({
                status: true,
                message: "Question already added before",
                data: user,
            });
            return;
        }

        solvedQuestion.push(solvedQuestionNum);
        solvedQuestion.sort();
        console.log("UPDATED", solvedQuestion);
        await User.update(
            {
                solvedQuestion: solvedQuestion,
            },
            {
                where: { id: userId },
            }
        );
        const updatedUser = await User.findOne({
            where: { id: userId },
        });
        res.status(201).json({
            status: true,
            message: "solved question added!",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { codeRun, solvedQuestion };
