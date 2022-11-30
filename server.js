require("dotenv").config({ path: "./config.env" });

const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user")
const gameRoutes = require("./routes/game")

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use("https://average-tank-top-moth.cyclic.app/api/user", userRoutes);
app.use("https://average-tank-top-moth.cyclic.app/api/user/api/game", gameRoutes);

mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })