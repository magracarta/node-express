const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");


const app = express();

app.set("port", process.env.PORT || 3000);

app.use("/" , express.static(path.join(__dirname, "public")));//일반 static 폴더 설정
app.use("/img", express.static(path.join(__dirname, "uploads"))); //upload 용 ㅇ static 설정

try{
    fs.readdirSync("uploads");
}catch(err){
    fs.mkdirSync("uploads");
    console.log("업로드 파일이 없어 생성");
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));

dotenv.config();

// 쿠키와 세션
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{ //session-cookie 설정
        httpOnly:true,
        secure:false,
    }
}));

const indexRouter = require('./Routers/index');
const membersRouter= require('./Routers/members');
const boardsRouter= require('./Routers/boards');
app.use("/",indexRouter);

app.use("/members",membersRouter );
app.use("/boards",boardsRouter );


//에러 라우터 
app.use((req, res, next)=>{
    res.status(404).send('404 에러입니다.');
});

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(200).send('에러 안알려줌')
});

app.listen(app.get("port") , ()=>{
    console.log(app.get("port") , " 포트 열림....");
});