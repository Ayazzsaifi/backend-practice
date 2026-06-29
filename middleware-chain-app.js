const express = require("express");
const app=express();

app.use((req, res, next) => {
    // set the header here
    // then call next()
});