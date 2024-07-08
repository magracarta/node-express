const express = require("express");
const app = express();
const path= require("path");
const cookieParser = require('cookie-parser');
const session = require("express-session");

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//쿠키파서 사용을 위한 설정
app.use(cookieParser());

//세션 활용을 위한 설정
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"abcd", //암호화 코드
}));

app.get("/",(req,res)=>{
    const name = req.cookies.name;
    if( name ){
        res.send(`<h2>${decodeURIComponent(req.cookies.name)}님 안녕하세요</h2><a href="/logout">로그아웃</a>`);
    }else{
        res.sendFile(path.join(__dirname,"/index.html"));
    }
   
});

app.get("/logout",(req, res)=>{
    //쿠키의 삭제
    res.clearCookie("name" ,{httpOnly:true , path:'/'});
    res.redirect("/");
})

app.post("/login",(req, res)=>{
    const name = req.body.name;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes()+1);
    //name 이라는 이름으로 전송된 이름을 쿠키에 저장.
    res.cookie('name' , encodeURIComponent(name), {expires, httpOnly:true , path:'/'});
    res.redirect("/");

});


app.listen(app.get("port"),()=>{console.log(app.get("port") , "포트 서버 오픈")});