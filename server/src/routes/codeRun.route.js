const express = require("express");
const { PythonShell } = require("python-shell");

const router = express.Router();

router.post("/api/python", (req, res) => {
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
        res.json({ codeRunDebug, codeRunOutput });
    });
});

module.exports = router;
