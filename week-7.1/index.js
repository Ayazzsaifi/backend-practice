const express = require("express");
const app = express();
const { userModel, todoModel } = require("./db")




app.post("/signup", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await userModel.insert({
        email: email,
        password: password,
        name: name
    })

});

app.post("/signin", function (req, res) { });

app.post("/todo", function (req, res) { });

app.get("/todos", function (req, res) { });
