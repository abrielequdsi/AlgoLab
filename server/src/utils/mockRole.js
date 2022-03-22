const db = require("../app/models");

const Role = db.role;

export default function initial() {
    Role.create({
        id: 1,
        name: "student",
    });

    Role.create({
        id: 2,
        name: "teacher",
    });

    Role.create({
        id: 3,
        name: "admin",
    });
}
