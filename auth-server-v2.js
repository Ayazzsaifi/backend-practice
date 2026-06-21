const express= require('express');
const jwt=require('jsonwebtoken');
const { rejects } = require('node:assert');

const app= express();
const jsonParser=express.json();

function getUserData(user){
    return new Promise(function (resolve,rejects){

        setTimeout(function(){
            return resolve(user)
        },1000)
    })
}

app.get('/profile',middleware,async function(req,res){
    try{
   const user= await getUserData(req.user);
   res.json({
    user:user
   })}
   catch(e){
    res.status(500).json({ err: "something went wrong" });
}})


function middleware(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            err:"authorization not found"
        })
    }
    else{
        try{
            const token=jwt.verify(authHeader, "mysecretkey");
            req.user=token
            next();
        }
        catch (e){
            return res.status(401).json({
                err:"token was invalid"
            })
        }
    }

}
app.use(jsonParser);


const users=[];

app.post('/sigup',function(req,res){
    const username=req.body.username;
    const pass=req.body.pass;

    const existingUser=users.find(function(u){
        return username===u.username;

    })

    if(existingUser){
        res.json({
            err:"user already exist"
        })
    }
    else{
        users.push({username:username,pass:pass});
        res.json({
            msg:"you have successfully signup"
        });
    }

})

app.post('/login',function(req,res){
    const username=req.body.username;
    const pass=req.body.pass;
    const existingUser=users.find(function(u){
        return username===u.username && pass===u.pass;
    })
    if(existingUser){
        const token= jwt.sign({username},"mysecretkey")
        res.json({
            token
        })
    }
    else{
        res.status(401).json({
            err:"invalid credentials"
        })
    }
})





app.listen(3000);