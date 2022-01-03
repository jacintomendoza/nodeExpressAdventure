const { query } = require("express");
const express = require("express");
// const querystring = requre("querystring");
// node 14 or higher: // import * as express from "express";
const app = express();
const port = process.env.PORT || 3333;
var session = require('express-session');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '../assets/img'));

// Instead of using body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: 'random string qwfegret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

// with npm install ejs:
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    let user = "";
    let punctuation = "";
    let invalid_login = false;

    invalid_login = req.query.reason || null; //params.get("reason") || null;

    if (req.session && req.session.username){
        user = req.session.username;
        punctuation = ",";
    }

    res.render("index", {my_user: user, punctuation: punctuation, invalid_login: invalid_login});
})

app.post('/signup', (req, res) => {
    const valid_users = [
        {"name": "Josh", "password": "123"},
        {"name": "Josef", "password": "123"},
        {"name": "Jessica", "password": "123"}];

    const user = req.body.username;
    const pass = req.body.password;

    const found_user = valid_users.find(usr => 
        usr.name == user && usr.password == pass
    );
    
    if (found_user){
        req.session.username = user;
        res.redirect("/caves");
    }
    else{
        req.session.destroy(()=>{

        })
    res.redirect("/?reason=invalid_user");
    }
})

app.get("/caves", (req,res) => {
    if (req.session && req.session.username) {res.render("caves", {user: req.session.username});}
    else {req.session.destroy(() => {});
}})

app.get("/death/:deathname", (req,res) => {
    const deathtype = req.params["deathname"];

    if (req.session && req.session.username) {res.render("death", {deathname: deathtype});}
    else {req.session.destroy(() => {});}
    // res.render("death", {deathname: deathtype});
})

app.get("/chests", (req,res) => {
    if (req.session && req.session.username) {res.render("chests");}
    else {req.session.destroy(() => {});}
    // res.render("chests");
})

app.get("/accessories", (req,res) => {
    if (req.session && req.session.username) {res.render("accessories");}
    else {req.session.destroy(() => {});}
    // res.render("accessories");
})

app.get("/cities", (req,res) => {
    if (req.session && req.session.username) {res.render("cities");}
    else {req.session.destroy(() => {});}
    // res.render("cities");
})

app.get("/winner", (req,res) => {
    if (req.session && req.session.username) {res.render("winner");}
    else {req.session.destroy(() => {});}
    // res.render("winner");
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
