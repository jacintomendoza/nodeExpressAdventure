const express = require("express");
// node 14 or higher: // import * as express from "express";
const app = express();
const port = "3333";

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '../assets/img'));

// with npm install ejs:
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("caves");
})

app.get("/death/:deathname", (req,res) => {
    const deathtype = req.params["deathname"];
    res.render("death", {deathname: deathtype});
})

app.get("/chests", (req,res) => {
    res.render("chests");
})

app.get("accessories", (req,res) => {
    res.render("accessories");
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

// app.get("/bird/:birdname", (req,res) => {
//     const name = req.params["birdname"];

//     const raptors = ["hawk", "falcon"];
//     res.render("bird", {birdname: name});

// })
