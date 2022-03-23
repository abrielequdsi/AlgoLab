import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password, roles) => {
    let body = {
        username,
        email,
        password,
    };
    roles !== "" && (body.roles = ["teacher"]);
    return axios.post(API_URL + "register", body);
};

const login = (email, password) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response) => {
            // Store the info on local storage,
            // accessToken will only store userId
            if (response.data.data.accessToken) {
                // This is the weakness of {message, status, data} format, in the response
                localStorage.setItem(
                    "jwtToken",
                    JSON.stringify(response.data.data)
                );
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("jwtToken");
};

export { login, logout, register };
