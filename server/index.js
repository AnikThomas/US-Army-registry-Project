const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require("cors");
const personnelRoute = require('./routes/personnelRoute');

app.use(compression());
app.use(morgan(process.env.ENVIRONMENT));
app.use(express.json());
app.use(cors())

// While in dev mode static content will be pulled from public, otherwise it wil look for a build folder
if (process.env.ENVIRONMENT === "dev") {
    app.use(express.static(path.join(__dirname, "client", "public")));
}

//setup the route
app.use("/personnel", personnelRoute);


// default index page that will be loaded based on enviroment
app.get('*', (req, res) => {
    if (process.env.ENVIRONMENT === "dev") {
      res.sendFile(path.join(__dirname, "client", "public", "index.html"));
    } else {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    }
  });



// Connecting to MongoDB database
const db = process.env.DB_URI;
const dbconfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(db, dbconfig, (err) => {
    if (err) console.error(err);
    console.log("connected to MongoDB");
});

app.listen(PORT, () => {
    console.log("Server has started!");
});