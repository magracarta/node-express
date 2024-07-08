const express = require('express');
const router = express.Router();

router.get("/",(req, res)=>{
    res.send("<h1>Hello , Express router - USER - '/'</h1>");
});

router.get("/search",(req,res)=>{
    res.send("<h1>Hello, Express router - USER - '/search'</h1>");
});


module.exports = router;
