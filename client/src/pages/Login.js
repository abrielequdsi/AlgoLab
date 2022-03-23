import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import { createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, Navigate } from "react-router-dom";
// router
import { history } from "../utils/history";
// redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/auth";
import axios from "axios";

const theme = createTheme();

export default function Login() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const message = useSelector((state) => state.message.message);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const validate = (email, password) => {
        let temp = { email: "", password: "" };
        if (email === "") {
            temp.email = "This field is required.";
        } else {
            temp.email = !(email && /$^|.+@.+..+/.test(email))
                ? "Email is not valid."
                : "";
        }
        temp.password = !password ? "This field is required." : "";
        setErrors({ ...temp });
        if (temp.email === "" && temp.password === "") {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        if (validate(email, password) && !(errors.email && errors.password)) {
            dispatch(login(email, password))
                .then(() => {
                    history.push("/");
                    window.location.reload();
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
                        Login
                    </Typography>
                    {/* Non UCL STUDENT */}
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            error={errors.email ? true : false}
                            helperText={errors.email || ""}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            error={errors.password ? true : false}
                            helperText={errors.password || ""}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 3 }}
                        >
                            {loading ? (
                                <CircularProgress color="inherit" />
                            ) : (
                                "Login"
                            )}
                        </Button>

                        {message && (
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

                        <Divider>
                            <Typography>or</Typography>
                        </Divider>
                        <Grid
                            container
                            justifyContent="center"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            <Grid item sm={5}>
                                <Button
                                    onClick={() => {
                                        axios.get(
                                            "https://uclapi.com/oauth/authorise?client_id=9947826279026482.1823714591393847&state=1"
                                        );
                                    }}
                                    variant="contained"
                                    sx={{ padding: "2.5px 2.5px" }}
                                >
                                    <Box
                                        component="img"
                                        sx={{ cursor: "pointer" }}
                                        width="100%"
                                        alt="Login via UCL"
                                        src="https://s3.eu-west-2.amazonaws.com/uclapi-static/SignInWithUCLSmall.png"
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link
                                    variant="body2"
                                    href="/register"
                                    sx={{ cursor: "pointer" }}
                                >
                                    Don't have an account? Register
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
