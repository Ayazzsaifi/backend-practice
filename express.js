const express = require('express');
const app = express();

app.get('/',function (req,res){
    res.send("welcome to my Express Server!");
});

app.get('/about',function(req,res){
    res.send("About page");
});

app.get('/contact',function(req,res){
    res.send("contact me here - Ayaz@gmail.com");
});

app.get('/user',function(req,res){
    res.json({
        name:"ayaz",
        age:23,
        city:"Faridabad",
        skills:["JavaScript","Node.js","Express"]

    });
});



app.listen(3000,function(){
    console.log("Express server running on port 3000")
});