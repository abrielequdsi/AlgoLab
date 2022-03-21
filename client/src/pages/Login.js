import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
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
              Login
            </Button>

            {/* <Grid container justifyContent="center">
              <Grid item>
                <Typography>or</Typography>
              </Grid>
            </Grid> */}
            <Divider>
              <Typography>or</Typography>
            </Divider>
            <Grid container justifyContent="center" sx={{ mt: 2, mb: 2 }}>
              <Grid item sm={5}>
                <Button
                  href="https://uclapi.com/oauth/authorise?client_id=9984444452905842.9366660907312980&state=STATE"
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
                  onClick={() => navigate("/register")}
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
