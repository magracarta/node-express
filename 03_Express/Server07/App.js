const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");

const app = express();

app.set('port' , process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
dotenv.config();

//쿠키파서 사용을 위한 설정
app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.SESSION_SECRET, //암호화 코드
}));


app.get("/",(req,res)=>{
    //if(req.cookies['session']){}
    if(req.session[req.cookies.session]){
        res.send(`<h2>${req.session[req.cookies.session]}님 반갑습니다.</h2><a href="/logout">로그아웃</a>`);
    }else res.sendFile(path.join(__dirname,'/index.html'));
});

app.post("/login",(req, res)=>{
    const userid =  req.body.userid;
    const pwd = req.body.pwd;
    if(userid == 'scott' && pwd=='1234'){
        //고유키를 하나 발생해서 세션에 저장할 키값으로 사용해서 세션 userid 를 저장
        //그리고 쿠키에 고유키를 session 이라는 이름으로 저장

        //익스프레스 서버에서 세션의 접근은 쿠키와 마찬가지로 req.session 으로 접근합니다.
        //저장형태는 키:밸류 형태의 객체형으로 여러값들을 저장하고 유지 시킬 수 있습니다.
        //지우거나 서버가 종료될때까지 또는 제한수명이 다할 때까지 유지 가능

        //고유키 하나를 생성합니다.
        const uniqueInt = Date.now(); // 현재 날짜 시간 -> 밀리초
        //고유키를 저장키 값으로 하여 userid를 세션에 저장합니다.
        //req.session.1234567 X
        req.session[uniqueInt] = userid;

        //고유키는 쿠키에 저장합니다. 저장이름'session'
        res.cookie('session',uniqueInt,{httpOnly:true ,path:'/'});
        //exprires 가 없는 쿠키는 브라우저가 닫힐때까지 수명입니다.
        res.json({msg:'ok'});

    }else if(userid != 'scott'){
        res.json({msg:'없는 아이디 입니다.'});
        //res.end(JSON.stringify({msg:'없는 아이디 입니다.'}));

    }else if(pwd != '1234'){    
        res.json({msg : '비밀번호가 맞지 않습니다.'})
    }
});


app.get("/logout",(req,res)=>{
    delete req.session[req.cookies.session];//세션의 일부항목 삭제
    //res.session[req.cookies.session]=null; //세션의 일부항목 삭제
    //res.session[req.cookies.session]="";//세션의 일부항목삭제
    res.clearCookie('session',{httpOnly:true, path:'/'});
    res.redirect("/");

    // req.session.destroy(
    //     function(){
    //         req.session;
    //     }
    // );//세션 전체 삭제
});
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), "포트 서버 오픈");
})