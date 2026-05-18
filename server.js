const http =require ('http');
const server = http.createServer(function(req,res){

    if(req.url==='/'){
        res.write("welcome to home page!");
        res.end();
    }else if(req.url==='/about'){
        res.write("This is Ayaz's Server")
        res.end();
    }
    else{
        res.write("404-Page Not found")
        res.end();
    }
});

server.listen(3000);
console.log("server running on port 3000");