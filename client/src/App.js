import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IDE from "./pages/IDE";
import QuestionList from "./pages/QuestionList";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  orange,
  blue,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@mui/material/colors";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const theme = JSON.parse(window.localStorage.getItem("theme"));
    if (theme === null || theme === "dark") {
      setIsLight(false);
    } else {
      setIsLight(true);
    }
  });

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
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
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
              <Route path="/" element={<Navigate to="/questions" />} />
              <Route path="/Login" exact element={<Login />} />
              <Route path="/Register" exact element={<Register />} />
              <Route path="/questions" exact element={<QuestionList />} />
              <Route
                path="/questions/:number"
                exact
                element={<IDE isLight={isLight} />}
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
