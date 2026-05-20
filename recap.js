const express = require('express');
const app= express();

app.get('/',function(req,res){
    res.send("hey AYaz");
});

app.get('/products',function(req,res){
    let products=[{name:"plane", price:2000},{name:"car",price:300}];

    res.json(products);
});

app.listen(3000);
console.log("server is running");