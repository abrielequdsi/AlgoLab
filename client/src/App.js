import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IDE from "./pages/IDE";
import QuestionList from "./pages/QuestionList";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddQuestion from "./pages/AddQuestion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { history } from "./utils/history";
import PrivateRoute from "./utils/PrivateRoute.js";
// redux
import { useDispatch } from "react-redux";
import { clearMessage } from "./redux/actions/message";

function App() {
    const dispatch = useDispatch();
    const [isLight, setIsLight] = useState(true);

    history.listen((location) => {
        dispatch(clearMessage()); // clear message when changing location
    });

    useEffect(() => {
        const theme = JSON.parse(window.localStorage.getItem("theme"));
        if (theme === null || theme === "dark") {
            setIsLight(false);
        } else {
            setIsLight(true);
        }
    }, []);

    const changeTheme = () => {
        setIsLight(!isLight);
        window.localStorage.setItem(
            "theme",
            JSON.stringify(isLight ? "dark" : "light")
        );
    };

    const darkTheme = createTheme({
        palette: {
            mode: isLight ? "light" : "dark",
        },
    });

    return (
        <React.Fragment>
            <BrowserRouter history={history}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Header changeTheme={changeTheme} isLight={isLight} />
                    <Box
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            padding: 2,
                            height: "100%",
                            display: "flex",
                        }}
                    >
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/questions" />}
                            />
                            {/* PRIVATE ROUTE */}

                            <Route
                                exact
                                path="/questions"
                                element={<PrivateRoute />}
                            >
                                <Route
                                    path="/questions"
                                    exact
                                    element={<QuestionList />}
                                />
                            </Route>

                            {/* PRIVATE ROUTE */}
                            <Route
                                exact
                                path="/questions/:number"
                                element={<PrivateRoute />}
                            >
                                <Route
                                    path="/questions/:number"
                                    exact
                                    element={<IDE isLight={isLight} />}
                                />
                            </Route>

                            {/* PRIVATE ROUTE */}

                            <Route
                                exact
                                path="/addquestion"
                                element={<PrivateRoute />}
                            >
                                <Route
                                    path="/addquestion"
                                    exact
                                    element={<AddQuestion />}
                                />
                            </Route>
                            {/* PRIVATE ROUTE */}

                            <Route path="/login" exact element={<Login />} />
                            <Route
                                path="/register"
                                exact
                                element={<Register />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/questions" />}
                            />
                            {/* <Route path="*" element={<Page404 />} /> */}
                        </Routes>
                    </Box>
                </ThemeProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
