const express = require('express');
const app = express();

app.use(express.json());

const users = [];
// in memory array

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    let token = ""
    for (let i = 0; i < 32; i++) {
        token = token + options[Math.floor(Math.random() * options.length)];
    }
    return token;
}


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
        const token = generateToken();

        user.token = token

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

    const user = users.find(u => u.token === token);
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