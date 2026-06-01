const express = require('express');
const app = express();

function ageChecker (req,res,next){  

    const age=req.query.age;

    if(age>=14){
        next();
    }
    else{
        res.json({
            msg:"youre not old enough"
        })
    }
}


app.get('/ride1',ageChecker,function(req,res){
    res.status(411).json({
        msg:"you have successfully riden ride . "
    })
})

app.use(function(req,res,next){

    const age=req.query.age;
    if(age>=18){
        next();
    }
    else{
        res.status(411).json({
            msg:"youre not old enough"
        })
    }
})
app.get('/ride2',function(req,res){
    res.json({
        msg:"you have successfully riden ride . "
    })

})


app.listen(3000);