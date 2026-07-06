const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

// To use a JWT 1st create a JWT secret - 
const JWT_SECRET = "pass123";

app.use(express.json());// to take the input from body 
const users = [];


app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "public", "index.html"))
})


app.post('/signup', logger, function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // we should check if a person is already of this name

    const existingUser = users.find(function (u) {
        return u.username === username;
    });

    if (existingUser) {
        return res.json({
            message: "User exist with this username"
        })
    }

    else {
        users.push({
            username: username,
            password: password
        })
    }


    res.json({
        message: "You have successfully signup, you can login now"
    })

});

function logger(req, res, next) {
    console.log(req.method)
    next();
}


app.post('/signin', logger, function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(function (u) {
        if (u.username == username && u.password == password) {
            return true
        }
        else {
            return false
        }
    })


    // we have to send back a token when user signIn

    if (foundUser) {

        const token = jwt.sign({
            username
        }, JWT_SECRET);


        res.json({
            token: token
        })
    }
    else {
        res.json({
            message: "Credentials are incorrect"
        })
    }

});

function auth(req, res, next) {
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({
            message:"youre not logged In"
        });
    }

    
    try{
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.username = decodedData.username;
        next()
    }

    catch(err){
         return res.status(401).json({ message: "Invalid or expired token" });
    }
}



app.get("/me", auth, logger, function (req, res) {

    const foundUser = users.find(function (u) {
        return u.username === req.username
    });

    if (!foundUser) {
        return res.json({
            error: "Invalid"
        })
    }

    res.json({
        username: foundUser.username,
        password:foundUser.password
    })
})


app.listen(3000);
console.log("server is running");