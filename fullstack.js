const express = require('express');
const app=express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/api/message',function(req,res){
    res.json({
        message: "hello from your backend!"
    });
});

app.listen(3000);
console.log("server running on port 3000");