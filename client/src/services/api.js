const baseURL = "http://localhost:8080";

const api = {
    auth: {
        login: `${baseURL}/auth/login/`,
        register: `${baseURL}/api/register/`,
    },
    user: {
        getUsers: `${baseURL}/api/user/all`,
        getStudents: `${baseURL}/api/user/students`,
        getTeachers: `${baseURL}/api/user/teachers`,
        getAdmins: `${baseURL}/api/user/admins`,
        getRoles: `${baseURL}/api/user/roles`,
        postRoles: `${baseURL}/api/user/postRole`,
        getUserSolvedQuestion: `${baseURL}/api/user/getUserSolvedQuestion`,
        // retrieve: (id) => `${baseURL}/api/contacts/${id}/`,
    },
    codeRun: {
        python: `${baseURL}/api/codeRun/python`,
        solvedQuestion: `${baseURL}/api/codeRun/solvedQuestion`,
    },
    oauth: {
        authenticate: `${baseURL}/api/oauth/authenticate`,
    },
    question: {
        postQuestion: `${baseURL}/api/question/postQuestion`,
    },
};

export default api;
