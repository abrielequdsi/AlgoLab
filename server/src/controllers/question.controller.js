var fs = require("fs");

const postQuestion = async (req, res) => {
    const questionNum = req.body.questionNum;
    const state = req.body.state;

    const path = "../client/src/problem-question/" + questionNum;

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    function createFile(fileName, content) {
        fs.writeFile(path + "/" + fileName, content, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log(fileName + "  was saved!");
        });
    }

    try {
        // Save in file Frontend
        createFile(
            "info.js",
            `
            const title = "${state.title}";
            const difficulty = "${state.difficulty}";
            const category = "${state.category}";

            export { title, difficulty, category };
            `
        );
        createFile("prompt.md", state.questionPrompt);
        createFile("solution.md", state.solutionCode);
        createFile(
            "solutionVideo.js",
            `
            const solutionVideo = "${state.solutionVideo}"

            export default solutionVideo
            `
        );
        createFile("starter.md", state.starterCode);

        let output = `const testCases = [\n`;
        let num = 0;
        Object.keys(state).forEach((key) => {
            if (key.toString().includes("testCase") && state[key] !== "") {
                if (!key.toString().includes("Answer")) {
                    num += 1;
                    output +=
                        `{\n` +
                        `input:` +
                        `${state["testCase" + num]},\n` +
                        `output:` +
                        `${state["testCaseAnswer" + num]},\n` +
                        `},\n`;
                }
            }
        });

        output += `\n]\nexport default testCases`;

        console.log(output);
        createFile("testCases.js", output);
        createFile("Visualiser.js", state.visualiser);

        res.status(200).json({
            message: "New Question was saved successfully!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

module.exports = { postQuestion };
