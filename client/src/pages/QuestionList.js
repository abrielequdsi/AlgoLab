import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import QuestionListItem from "../components/QuestionList/QuestionListItem";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

function getDirCount(r) {
    const filesCount = r.keys().length;
    const lastItem = r.keys()[filesCount - 2]; // Minus 2 bcs of the template.js
    const newLastItem = lastItem.replace("./", "");
    const slashLoc = newLastItem.indexOf("/");
    const questionNumber = newLastItem.slice(0, slashLoc);
    return parseInt(questionNumber);
}

function QuestionList() {
    const [roles, setRoles] = useState([]);
    const [openStudents, setOpenStudents] = useState(false);
    const [openTeachers, setOpenTeachers] = useState(false);

    const handleStudentsClick = () => {
        setOpenStudents(!openStudents);
    };
    const handleTeachersClick = () => {
        setOpenTeachers(!openTeachers);
    };
    const { id } = useSelector((state) => state.auth.user);
    const [infos, setInfos] = useState([]);
    const [solvedQuestion, setSolvedQuestion] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const dirCount = getDirCount(require.context("../problem-question"));
        // Get Question Infos
        setInfos([]);
        for (let i = 0; i < dirCount; i++) {
            import(`../problem-question/${i + 1}/info.js`)
                .then((res) =>
                    setInfos((prev) => [
                        ...prev,
                        {
                            title: res.title,
                            category: res.category,
                            difficulty: res.difficulty,
                        },
                    ])
                )
                .catch((err) => console.log(err));
        }
        // Get Solved Questions
        // Make this dynamic
        axios
            .post("http://localhost:8080/api/user/getUserSolvedQuestion", {
                id,
            })
            .then((response) => {
                setSolvedQuestion(response.data.data);
            });

        // Get Users
        axios
            .get("http://localhost:8080/api/user/teachers")
            .then((response) => {
                setTeachers(response.data.data);
            });
        axios
            .get("http://localhost:8080/api/user/students")
            .then((response) => {
                setStudents(response.data.data);
            });

        // Get user role
        const token = JSON.parse(window.localStorage.getItem("jwtToken"));
        if (token) {
            setRoles(token.roles);
        }
    }, []);

    return (
        <Container maxWidth="lg" sx={{ minHeight: "90.3vh" }}>
            <Grid container sx={{ mt: 3, mb: 3 }}>
                <Box sx={{ width: "100%" }}>
                    {" "}
                    <Typography variant="h5" gutterBottom>
                        Algorithm Problems
                    </Typography>
                    <Divider />
                </Box>
            </Grid>
            <Grid container spacing={5}>
                {/* MAIN */}
                <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{
                        "& .markdown": {
                            py: 3,
                        },
                    }}
                >
                    <Paper variant="outlined" sx={{ m: 0 }}>
                        <List
                            sx={{ width: "100%", padding: 0 }}
                            component="nav"
                            aria-label="mailbox folders"
                        >
                            {infos.map((info, i) => (
                                <Box key={i + 1}>
                                    <QuestionListItem
                                        title={info.title}
                                        category={info.category}
                                        difficulty={info.difficulty}
                                        number={i + 1}
                                        solved={solvedQuestion.includes(
                                            (i + 1).toString()
                                        )}
                                    />
                                    <Divider />
                                </Box>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* SIDEBAR */}

                <Grid item xs={12} md={4}>
                    <Paper elevation={0} sx={{ p: 2 }}>
                        {/* INFO SECTION */}
                        <Box>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ fontWeight: "bold" }}
                                gutterBottom
                            >
                                Module Tutors
                            </Typography>
                            <Divider sx={{ mt: 1.5, mb: 1.5 }} />
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Email:</strong>
                                <span>&nbsp; </span>owen.willis@ucl.ac.uk
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Office:</strong>
                                <span>&nbsp; </span> Room G04.2, 60-70 Gower
                                Street
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Office hours:</strong>{" "}
                                <span>&nbsp; </span>
                                Thursdays 4pm-5pm via zoom
                            </Typography>
                        </Box>
                    </Paper>
                    {/* LIST ITEM */}
                    <List
                        sx={{
                            width: "100%",

                            bgcolor: "background.paper",
                            pt: 1,
                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <Box sx={{ pl: 2, pr: 2 }}>
                                <Typography
                                    sx={{ pb: 0.75, fontWeight: "bold" }}
                                    variant="body1"
                                    gutterBottom
                                    color="text.secondary"
                                >
                                    Users
                                </Typography>
                                <Divider sx={{ mb: 0.5 }} />
                            </Box>
                        }
                    >
                        <ListItemButton onClick={handleTeachersClick}>
                            <ListItemIcon sx={{ minWidth: "0", pr: 1.5 }}>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="Teachers" />
                            {openTeachers ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                            in={openTeachers}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {teachers.map((teacher) => {
                                    return (
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: "0",
                                                    pr: 1.5,
                                                }}
                                            >
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <>
                                                        <Typography
                                                            fontWeight="bold"
                                                            color="primary"
                                                        >
                                                            {teacher.username}
                                                        </Typography>
                                                        <Typography>
                                                            {teacher.email}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </Collapse>
                        <ListItemButton onClick={handleStudentsClick}>
                            <ListItemIcon sx={{ minWidth: "0", pr: 1.5 }}>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Students" />
                            {openStudents ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                            in={openStudents}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {students.map((student) => {
                                    return (
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: "0",
                                                    pr: 1.5,
                                                }}
                                            >
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <>
                                                        <Typography
                                                            fontWeight="bold"
                                                            color="primary"
                                                        >
                                                            {student.username}
                                                        </Typography>
                                                        <Typography>
                                                            Solved:{" "}
                                                            <span
                                                                style={{
                                                                    color: "#1ba94c",
                                                                }}
                                                            >
                                                                (
                                                                {
                                                                    student
                                                                        .solvedQuestion
                                                                        .length
                                                                }
                                                                /{infos.length})
                                                            </span>
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </Collapse>
                    </List>
                    {/* Add new file */}
                    {roles.includes("teacher") && (
                        <Grid sx={{ mt: 4, mb: 4, justifyContent: "center" }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ fontWeight: "bold" }}
                                href="/addQuestion"
                                startIcon={
                                    <AddCircleOutlineIcon
                                        fontSize="large"
                                        sx={{ fontWeight: "bold" }}
                                    />
                                }
                            >
                                Add Question
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

export default QuestionList;
