const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();



router.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname, '/..', '/views/loginForm.html'));
});


module.exports = router;