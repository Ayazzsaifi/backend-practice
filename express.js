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

app.get('/students',function(req,res){
    const students=[
        {name:"Ayaz", marks:85},
        {name:"Ali", marks:32},
        {name:"Zara", marks:91},
        {name:"Umer", marks:45},
        {name:"Sara", marks:28},
    ];
    res.json(students);
});

app.get('/search',function(req,res){
    let name=req.query.name;
    res.json({
        message:"you search for :" +name
    });
});

app.get('/student/search',function(req,res){
    const students = [
        {name: "Ayaz", marks: 85},
        {name: "Ali", marks: 32},
        {name: "Zara", marks: 91},
        {name: "Umar", marks: 45},
        {name: "Sara", marks: 28}
    ];

    let searchName= req.query.name;
    let result= students.filter(function(student){
        return student.name=== searchName;
    });

    res.json(result);

});



app.listen(3000,function(){
    console.log("Express server running on port 3000")
});