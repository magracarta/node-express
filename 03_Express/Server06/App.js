const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();


app.set('port' , process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//쿠키파서 사용을 위한 설정
app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"abcd", //암호화 코드
}));

app.get("/",(req,res)=>{
    if(req.cookies.userid){
        res.send(`<h2>${req.cookies.userid}님 반갑습니다. <a href="/logout">로그아웃</a></h2>`);
    }else{
        res.sendFile(path.join(__dirname,"/index.html"));
    }
});
app.post("/login",(req, res)=>{
    const userid = req.body.userid;
    const pwd = req.body.pwd;
    console.log(userid, pwd);
    if(userid == 'scott' && pwd=='1234'){
        const expires = new Date();
        expires.setMinutes(expires.getMinutes()+1);
        res.cookie('userid', encodeURIComponent(userid),{expires:expires , httpOnly: true , path:"/"});
        res.json({msg:'ok'});
        //res.redirec("/"); //axios 로 요청된건 반드시 요청된 곳으로 응답이 가야하기 떄문에 res.redirect는 사용하지 않는것이 좋습니다.
    }else if(userid != 'scott'){
        res.json({msg:'없는 아이디 입니다.'});
        //res.end(JSON.stringify({msg:'없는 아이디 입니다.'}));

    }else if(pwd != '1234'){    
        res.json({msg : '비밀번호가 맞지 않습니다.'})
    }
});

app.get("/logout",(req,res)=>{
    res.clearCookie("userid", {httpOnly:true, path:'/'});
    res.redirect("/");
});


app.listen(app.get("port"),()=>{console.log(app.get("port") , "포트 서버 오픈")});