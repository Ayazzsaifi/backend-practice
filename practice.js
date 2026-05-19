const express = require('express');
const app=express();

app.get('/',function(req,res){
    res.send("Hello world");
});

app.get('/products',function(req,res){
    let products=[{name:"Phone",price:2000},{name:"car",price:5000},{name:"plane",price:7000}];

    res.json(products);
});

app.listen(3000);
console.log("server is running on port-3000");
