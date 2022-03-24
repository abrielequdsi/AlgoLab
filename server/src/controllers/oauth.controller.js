const db = require("../models");
const moment = require("moment");
const randomstring = require("randomstring");
const util = require("util");
const axios = require("axios");
const client_id = "9984444452905842.9366660907312980";
const client_secret =
    "a9446fab8a97bffe425139ea6d71c0b1eb9d483f8afaa12888d680ee4547a5e2";
const bcrypt = require("bcryptjs");
const { register } = require("./auth.controller");

// Not working right now, It fails to redirect the frontend to UCL SSO with cors header missing
const authorise = async (req, res) => {
    // In FE, it has been assigned directly as "random-string"
    // const state = randomstring.generate();
    const url = `https://uclapi.com/oauth/authorise?client_id=${client_id}&state=${state}`;
    res.redirect(url);
};

const callback = async (req, res) => {
    console.log("It works");
    res.redirect("http://localhost:3000/login");
};

const callback2 = async (req, res) => {
    // console.log(req);

    // Change this to Local Storage checking
    // if (!Object.keys(ctx.session).includes(`state`)) {
    //     ctx.throw(`You need to authorise first`, 401);
    // }
    const { result, code, state } = req.query;

    // make sure states match.
    if (`${state}` !== `random-string`) {
        ctx.throw(`States don't match`, 500);
    }

    // if user says "no"
    if (result === `denied`) {
        req.throw(`Request denied`, 400);
    }

    // Fetch token
    const tokenRes = await axios.get(
        `https://uclapi.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&code=${code.toString()}`
    );
    const apiToken = tokenRes.data.token;
    console.log(apiToken);

    // Fetch User data
    const userRes = await axios.get(
        `https://uclapi.com/oauth/user/data?client_secret=${client_secret}&token=${apiToken}`
    );

    const user = {
        email: userRes.data.email,
        full_name: userRes.data.full_name,
        department: userRes.data.department,
        given_name: userRes.data.given_name,
        upi: userRes.data.upi,
        scopeNumber: userRes.data.scope_number,
        isStudent: userRes.data.is_student,
        apiToken,
    };

    const registerParam = {
        username: user.given_name,
        email: user.email,
        password: bcrypt.hashSync((user.upi + user.given_name).slice(8), 8),
        roles: user.isStudent ? ["student"] : ["teacher"],
    };

    console.log(registerParam);

    // THIS FLOW HAS NOT WORKED YET. IT STILL NEED TO DO THIS ON THE FRONTEND

    // FIND BETTER WAY TO STORE USER DATA USING EXTERNAL OAUTH
    const registerRes = await axios.post(
        "http://localhost:8080/api/auth/register",
        registerParam
    );

    if (registerRes.data.message.includes("already in use!")) {
        console.log("User has login using SSO before");
    }

    res.status(200).json({
        status: true,
        message: "Get Login Data!",
        data: {
            email: registerParam.email,
            password: password.registerParam,
        },
    });

    // const loginRes = await axios.post(
    //     "http://localhost:8080/api/auth/register",
    //     {
    //         email: user.email,
    //         password: bcrypt.hashSync((user.upi + user.given_name).slice(8), 8),
    //     }
    // );
    // res.status(200).json({
    //     status: true,
    //     message: "Login success!",
    //     data: loginRes.data.data,
    // });
};

module.exports = { authorise, callback };
