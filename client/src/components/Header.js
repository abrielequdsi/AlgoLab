import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
//
import MUISwitch from "./IDE/MUISwitch";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";

function Header({ changeTheme, isLight }) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [email, setEmail] = useState("null");
    const [username, setUsername] = useState("null");
    const [roles, setRoles] = useState("null");
    useEffect(() => {
        const token = JSON.parse(window.localStorage.getItem("jwtToken"));
        if (token) {
            setEmail(token.email);
            setUsername(token.username);
            setRoles(token.roles);
        }
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <strong>{email} </strong>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                Role:&nbsp;
                <strong>
                    {" "}
                    {roles[0].charAt(0).toUpperCase() + roles[0].slice(1)}
                </strong>
                {/* <strong> Role:</strong> &nbsp; Student */}
            </MenuItem>
            <MenuItem>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(logout())}
                >
                    Logout
                </Button>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Button
                    onClick={() => navigate("/questions")}
                    variant="outlined"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Questions
                </Button>
            </MenuItem>
            <MenuItem>
                <IconButton
                    sx={{ padding: "0" }}
                    onClick={() => changeTheme()}
                    color="inherit"
                >
                    <MUISwitch checked={isLight} />
                </IconButton>
            </MenuItem>

            {isLoggedIn ? (
                <MenuItem onClick={handleProfileMenuOpen}>
                    <Avatar
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color=""
                        sx={{ margin: "8px 12px 8px 6.5px", cursor: "pointer" }}
                    >
                        {username[0].toUpperCase()}
                    </Avatar>
                    <p>Profile</p>
                </MenuItem>
            ) : (
                <MenuItem>
                    <Button
                        onClick={() => navigate("/login")}
                        sx={{ margin: "5px 0 5px 12px" }}
                    >
                        Login
                    </Button>
                </MenuItem>
            )}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                elevation={0}
                color="default"
                sx={{
                    borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                }}
            >
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{
                            display: { sm: "block" },
                            marginLeft: "12px",
                            flexGrow: 1,
                            fontSize: "24px",
                        }}
                    >
                        DaPS Scenario
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            sx={{ ml: 1 }}
                            onClick={() => changeTheme()}
                            color="inherit"
                        >
                            <MUISwitch checked={isLight} />
                        </IconButton>
                        <Button
                            onClick={() => navigate("/questions")}
                            variant="outlined"
                            sx={{ margin: "8px 18px 8px 12px" }}
                        >
                            Questions
                        </Button>
                        {/* LOGIN LOGIC */}
                        {isLoggedIn ? (
                            <Avatar
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                sx={{
                                    margin: "8px 0 8px 12px",
                                    cursor: "pointer",
                                }}
                            >
                                {username[0].toUpperCase()}
                            </Avatar>
                        ) : (
                            <Button
                                onClick={() => navigate("/login")}
                                sx={{ margin: "8px 0 8px 12px" }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {isLoggedIn && renderMenu}
        </Box>
    );
}

export default Header;
