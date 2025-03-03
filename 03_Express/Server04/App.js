const express= require("express");
const app = express();
const path = require("path");

app.set("port" , process.env.PORT || 3000);

//파라미터와 json 형식의 사용을 위한 설정 - 전달 되어지는 파라미터를 json 객체로 바로 사용가능하게 하는 설정.
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"));
});
app.post("/login",(req,res)=>{
    const name = req.body.name;
    console.log(name);
    const pwd = req.body.pwd;
    console.log(pwd);
    console.log(req.body);

    res.redirect("/");
});

// app.get("/category/boots",(req,res)=>{
//     res.send('<h2>Hello Boots</h2>');
// });

app.get("/category/:kind",(req,res)=>{
    res.send(`<h2>hello wild card char ${req.params.kind}</h2>`);
});
//url에 파라미터를 태워서 보내는 예
//와일드 카드 키워드를 사용한 라우터는 범위가 넓으므로 가능한
//아래쪽에 위치시켜서, 명확하게 구분은 먼저 실행되게 하고,
//해당 라우터가 없을때 실행되게 하는것이 효과적입니다.

app.listen(app.get("port"), ()=>{console.log(app.get("port"),"포트 서버 오픈...");});


app.use((req,res,next)=>{
    res.status(404).send("404에러입니다. <a href='/'>맨첨음 페이지로 가기</a>");
});