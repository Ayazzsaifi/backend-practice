const express = require('express');
const jwt=require('jsonwebtoken');

const app=express();

// To use a JWT 1st create a JWT secret - 
const JWT_SECRET="pass123";

app.use(express.json());// to take the input from body 
const users=[];

function auth(){
    
}


app.post('/signup',function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    
    // we should check if a person is already of this name

    const existingUser = users.find(function(u){
        return u.username === username;
    });

    if(existingUser){
         return res.json({
            message:"User exist with this username"
        })
    }

    else{ 
    users.push({
        username:username,
        password:password
    })}


    res.json({
        message:"You have successfully signup, you can login now"
    })

});


app.post('/signin',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const foundUser=users.find(function(u){
        if(u.username == username && u.password == password){
            return true
        }
        else{
            return false 
        }
    })


    // we have to send back a token when user signIn

    if(foundUser){

        const token=jwt.sign({
            username
        },JWT_SECRET);


        res.json({
            token:token
        })
    }
    else{
        res.json({
            message:"Credentials are incorrect"
        })
    }

});


app.get("/me",function(req,res){
    const token=req.headers.token;

    const decodedData=jwt.verify(token,JWT_SECRET);

    if(decodedData.username){
        const foundUser=users.find(function(u){
            return u.username===decodedData.username
        });

        if(!foundUser){
            return res.json({
                error:"Invalid"
            })
        }

        res.json({
            username:foundUser.username,
            password:foundUser.password
        })
    }

})


app.listen(3000);
console.log("server is running");