const express = require ('express')
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json())

const SECRET="mysecretkey"

app.post('/login',(req,res)=>{
    const{username,password}=req.body

    if(username==="ayaz"&&password==="1234"){
        const token=jwt.sign({username},SECRET)
        res.json({token})
    }
    else{
        res.status(401).json({message:"invalid credentials"})
    }

})

function authMiddleware(req,res,next){
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({message:"No token provided"})
    }

    try{
        const decoded = jwt.verify(token,SECRET)
        req.user = decoded
        next()
    }catch(e){
        res.status(401).json({message:"invalid token"})
    }
}

app.get('/profile',authMiddleware,(req,res)=>{
    res.json({message:"welcome!",user:req.user})
})



app.listen(3000,()=>console.log("server running on port 3000"))