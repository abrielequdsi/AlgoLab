import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BasicInfo from "../components/AddQuestion/BasicInfo";
import CodeInfo from "../components/AddQuestion/CodeInfo";
import TestCases from "../components/AddQuestion/TestCases";
import fs from "fs-extra";
// include node fs module

const steps = ["Basic Info", "Code Info", "Test Cases"];

function getStepContent(step, handleChange) {
    switch (step) {
        case 0:
            return <BasicInfo handleChange={handleChange} />;
        case 1:
            return <CodeInfo handleChange={handleChange} />;
        case 2:
            return <TestCases handleChange={handleChange} />;

        default:
            throw new Error("Unknown step");
    }
}

function getDirCount(r) {
    const filesCount = r.keys().length;
    const lastItem = r.keys()[filesCount - 1];
    const newLastItem = lastItem.replace("./", "");
    const slashLoc = newLastItem.indexOf("/");
    const questionNumber = newLastItem.slice(0, slashLoc);
    return parseInt(questionNumber);
}

const questionNum = getDirCount();
const path = "../problem-question/" + questionNum.toString();

function createFile(fileName, content) {
    fs.writeFile(path + "/" + fileName, content, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log(fileName + "  was saved!");
    });
}

function AddQuestion() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    // HANDLE FORM
    const testCases = {
        testCase1: "",
        testCaseAnswer1: "",
        testCase2: "",
        testCaseAnswer2: "",
        testCase3: "",
        testCaseAnswer3: "",
        testCase4: "",
        testCaseAnswer4: "",
        testCase5: "",
        testCaseAnswer5: "",
        testCase6: "",
        testCaseAnswer6: "",
        testCase7: "",
        testCaseAnswer7: "",
        testCase8: "",
        testCaseAnswer8: "",
    };

    const [state, setState] = useState({
        title: "",
        difficulty: "",
        category: "",
        questionPrompt: "",
        solutionVideo: "",
        solutionCode: "",
        starterCode: "",
        visualiser: "",
        ...testCases,
    });

    // Handle fields change
    const handleChange = (input) => (e) => {
        setState((prevState) => ({ ...prevState, [input]: e.target.value }));
        console.log(state);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

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

        const testCases = [];

        for (let i = 1; i <= Object.keys(testCases).length / 2 + 1; i++) {
            if (state["testCase" + i] !== "") {
                testCases.push({
                    input: state["testCase" + i],
                    output: state["testCaseAnswer" + i],
                });
            }
        }

        createFile(
            "testCases.js",
            `
            const testCases = ${testCases};
              
              export default testCases;
              
            `
        );
        createFile(
            "testCases.js",
            `
            const testCases = ${testCases};
              
              export default testCases;
              
            `
        );
        createFile("Visualiser.js", state.visualiser);
    };

    return (
        <Container maxWidth="lg">
            <Grid container sx={{ mt: 3, mb: 3 }}>
                <Box sx={{ width: "100%" }}>
                    {" "}
                    <Typography
                        component="h1"
                        variant="h4"
                        gutterBottom
                        align="center"
                    >
                        Add New Question
                    </Typography>
                    <Divider />
                </Box>
            </Grid>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 1, md: 4 }, p: { xs: 2, md: 3 } }}
                >
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Question List has been updated !
                                </Typography>
                                {/* <Typography variant="subtitle1">
                                    Your order number is #2001539. We have
                                    emailed your order confirmation, and will
                                    send you an update when your order has
                                    shipped.
                                </Typography> */}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, handleChange)}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            sx={{ mt: 3, ml: 1 }}
                                        >
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={
                                            activeStep === steps.length - 1
                                                ? handleSubmit
                                                : handleNext
                                        }
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1
                                            ? "Submite"
                                            : "Next"}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </Container>
    );
}

export default AddQuestion;
