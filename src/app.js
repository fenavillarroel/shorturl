require("dotenv").config();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const urlsRoutes = require("./routes/urls");
const shortRoute = require("./routes/short");

mongoose.connect("mongodb://mongo/urls", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
 })
.then(db => console.log("Conectado a Mongodb"))
.catch(err => console.log(err));


//Settings
app.set("port",process.env.PORT || 8000);

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

//routes
//app.use(require("./routes/urls"));
app.use("/api/v1/url",urlsRoutes);
app.use("/",shortRoute);


app.listen(app.get("port"), () => {
    console.log("Server running port", app.get("port"));
});


