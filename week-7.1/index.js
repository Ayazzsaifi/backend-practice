const bcrypt=require("bcrypt")
const express = require("express");
const app = express();
const { userModel, todoModel } = require("./db");
const jwt = require("JsonWebToken");
const { default: mongoose } = require("mongoose");
const JWT_SECRET = "fjhs765786543"
app.use(express.json());

mongoose.connect("mongodb+srv://admin-cobra:oxFYJB6tG8ViXzbn@cluster0.xqoxshq.mongodb.net/todo-List-01")



app.post("/signup", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

      // hasing password

    const hassedPassword= await bcrypt.hash(password,5);
    console.log(hassedPassword);

    await userModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "youre logged in"
    })

});

app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email,
        password: password

    })

    console.log(user);

    if (user) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);
        res.json({
            token: token
        });
    }

    else {
        res.status(403).json({
            error: "incorrect credintaials"
        })
    }
});

app.post("/todo", auth, async  function (req, res) {
    const userId=req.userId;
    const title=req.body.title;

    const newTodo= await todoModel.create({
        title,
        userId
    })

    res.json({
        message:"Todo Added"
    })
    
});

app.get("/todos", async function (req, res) {
    const userId=req.userId;

    const todos=await todoModel.findOne({
        userId:userId
    })

    res.json({
        todos
    })
 
});


function auth (req, res, next) {
    const token = req.headers.token
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData){
        req.userId=decodedData.id;
        next();
    }
    else{
        res.status(403).json({
            err:"incorrect credintials"
        })
    }
}

app.listen(3000);