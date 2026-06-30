const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET="hahahehe"
const users = [];
// in memory array



app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You have signin"
    })

});


app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(function (u) {
        if (u.username == username && u.password == password) {
            return true;
        }
        else {
            return false;
        }
    })

    if (user) {
        const token = jwt.sign({
            username:username
        },JWT_SECRET)

        res.json({
            token: token
        })
    }
    else {
        res.status(404).json({
            message: "invalid username and password"
        })
    }



});


app.get("/me", function (req, res) {
    const token = req.headers.token;
    const decodedInformation=jwt.verify(token,JWT_SECRET);
    const username= decodedInformation.username
    

    const user = users.find(u => u.username === username);
    if (user) {
        res.json({
            message: "Hello " + user.username
        })
    }
    else{
        res.json({message:"invalid token"})
    }
})

app.listen(3000);