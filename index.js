"use strict";

let express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    app = express();

// Parse ---
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// .env ---
require('dotenv').config();
let port = process.env.PORT || 3000;

// Static Files ---
app.use(express.static(__dirname + "/public/"));

// Views ---
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

// Routes ---
app.use('/', require('./routes/pod'))

// MongoDB ---
mongoose.set('strictQuery', false);
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.kskaj2m.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))


app
    .use((req, res) => {
        res
            .status(404)
            .render("404", {
                titulo: "Error 404",
                descripcion: "Page Not Found"
            });
    })

    .listen(port)

console.log("Server listening on port " + port);