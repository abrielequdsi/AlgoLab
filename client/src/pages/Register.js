import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
// router
import { history } from "../utils/history";
// redux
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/auth";
// Teacher Code Key
import { teacherCodeKey } from "../configs/teacherCode";

const theme = createTheme();

export default function Register() {
    const { isLoggedIn } = useSelector((state) => state.auth);

    // HANDLE FORM
    const message = useSelector((state) => state.message.message);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        teacherCode: "",
    });

    const validate = (username, email, password, teacherCode) => {
        let temp = { username: "", email: "", password: "", teacherCode: "" };
        if (email === "") {
            temp.email = "This field is required.";
        } else {
            temp.email = !(email && /$^|.+@.+..+/.test(email))
                ? "Email is not valid."
                : "";
        }
        temp.username = !username ? "This field is required." : "";
        if (password === "") {
            temp.password = "This field is required.";
        } else {
            temp.password =
                password.length < 8
                    ? "Password must be 8 or more characters."
                    : "";
        }
        if (teacherCode && teacherCode !== teacherCodeKey) {
            temp.teacherCode = "Teacher Code is not valid.";
        }
        setErrors({ ...temp });

        if (
            temp.username === "" &&
            temp.email === "" &&
            temp.password === "" &&
            temp.teacherCode === ""
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const teacherCode = data.get("teacherCode");

        if (
            validate(username, email, password, teacherCode) &&
            !(
                errors.username &&
                errors.email &&
                errors.password &&
                errors.teacherCode
            )
        ) {
            dispatch(register(username, email, password, teacherCode))
                .then(() => {
                    setTimeout(() => {
                        history.push("/login");
                        window.location.reload();
                    }, 1500);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ height: "90.35vh" }}>
            <Paper elevation={0} sx={{ borderRadius: "10px" }}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px 20px",
                    }}
                >
                    <Avatar sx={{ m: 1 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                        noValidate
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={errors.username ? true : false}
                                    helperText={errors.username || ""}
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={errors.email ? true : false}
                                    helperText={errors.email || ""}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={errors.password ? true : false}
                                    helperText={errors.password || ""}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                            {message && (
                                <Grid item xs={12}>
                                    {message.includes(
                                        "User was registered successfully"
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
                            <Grid item xs={12}>
                                <Divider sx={{ mb: 2 }}>
                                    <Typography sx={{ fontSize: "12px" }}>
                                        Input Code To Get a Teacher Role
                                    </Typography>
                                </Divider>
                                <TextField
                                    error={errors.teacherCode ? true : false}
                                    helperText={errors.teacherCode || ""}
                                    fullWidth
                                    name="teacherCode"
                                    label="Teacher Code"
                                    type="password"
                                    id="teacherCode"
                                    autoComplete="teacherCode"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? (
                                <CircularProgress color="inherit" />
                            ) : (
                                "Register"
                            )}
                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    variant="body2"
                                    href="/login"
                                    sx={{ cursor: "pointer" }}
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
