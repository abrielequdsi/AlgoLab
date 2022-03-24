const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const router = require("./routes");

const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
};

const PORT = process.env.PORT || 8080;

app.use(cors({ corsOptions }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);

(async function () {
    try {
        await db.sequelize.sync(); // Connect db & Create db
        app.listen(PORT, () => {
            console.log(`🚀 Server is listening at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
        console.log("❌❌❌ DATABASE FAILED TO CONNECT");
    }
})();
