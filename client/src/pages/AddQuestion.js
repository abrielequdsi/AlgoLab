import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
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
import axios from "axios";
// router
import { history } from "../utils/history";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/actions/message";

const steps = ["Basic Info", "Code Info", "Test Cases"];

function getStepContent(step, handleChange, values) {
    switch (step) {
        case 0:
            return <BasicInfo handleChange={handleChange} values={values} />;
        case 1:
            return <CodeInfo handleChange={handleChange} values={values} />;
        case 2:
            return <TestCases handleChange={handleChange} values={values} />;

        default:
            throw new Error("Unknown step");
    }
}

function getDirCount(r) {
    const filesCount = r.keys().length;
    const lastItem = r.keys()[filesCount - 2];
    const newLastItem = lastItem.replace("./", "");
    const slashLoc = newLastItem.indexOf("/");
    const questionNumber = newLastItem.slice(0, slashLoc);
    return parseInt(questionNumber);
}

function AddQuestion() {
    const [activeStep, setActiveStep] = useState(0);
    const message = useSelector((state) => state.message.message);
    const dispatch = useDispatch();

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
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const dirCount = getDirCount(require.context("../problem-question"));
        const questionNum = dirCount + 1;

        axios
            .post("http://localhost:8080/api/question/postQuestion", {
                state,
                questionNum,
            })
            .then((response) => {
                dispatch(setMessage(response.data.message));
                setTimeout(() => {
                    history.push("/question");
                    window.location.reload();
                }, 1500);
            });
    };

    const {
        title,
        difficulty,
        category,
        questionPrompt,
        solutionVideo,
        solutionCode,
        starterCode,
        visualiser,
        testCase1,
        testCaseAnswer1,
        testCase2,
        testCaseAnswer2,
        testCase3,
        testCaseAnswer3,
        testCase4,
        testCaseAnswer4,
        testCase5,
        testCaseAnswer5,
        testCase6,
        testCaseAnswer6,
        testCase7,
        testCaseAnswer7,
        testCase8,
        testCaseAnswer8,
    } = state;
    const values = {
        title,
        difficulty,
        category,
        questionPrompt,
        solutionVideo,
        solutionCode,
        starterCode,
        visualiser,
        testCase1,
        testCaseAnswer1,
        testCase2,
        testCaseAnswer2,
        testCase3,
        testCaseAnswer3,
        testCase4,
        testCaseAnswer4,
        testCase5,
        testCaseAnswer5,
        testCase6,
        testCaseAnswer6,
        testCase7,
        testCaseAnswer7,
        testCase8,
        testCaseAnswer8,
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
                                {getStepContent(
                                    activeStep,
                                    handleChange,
                                    state
                                )}
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
                                            ? "Submit"
                                            : "Next"}
                                    </Button>
                                </Box>
                                {message && (
                                    <Grid item xs={12}>
                                        {message.includes(
                                            "New Question was saved successfully"
                                        ) ? (
                                            <Alert
                                                severity="success"
                                                variant="outlined"
                                                sx={{ mb: 1 }}
                                            >
                                                {message}
                                            </Alert>
                                        ) : (
                                            <Alert
                                                severity="error"
                                                variant="outlined"
                                                sx={{
                                                    mb: 1,
                                                    borderColor: "#f44336",
                                                    color: "#f44336",
                                                }}
                                            >
                                                {message}
                                            </Alert>
                                        )}
                                    </Grid>
                                )}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </Container>
    );
}

export default AddQuestion;
