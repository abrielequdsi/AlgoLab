const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
const corsOptions = {
    origin: "http://localhost:8000",
};

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

(async function () {
    try {
        await db.sequelize.sync(); // Connect db & Create db
        app.listen(PORT, () => {
            console.log(`🚀 Server is listening at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("❌❌❌ DATABASE FAILED TO CONNECT");
    }
})();
