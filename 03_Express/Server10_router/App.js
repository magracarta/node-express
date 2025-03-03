const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);


// app.get("/", (req ,res)=>{
//     res.send("<h1>Router 학습</h1>");
// });

//외부에 생성되고 클라이언트 요청에 응답할 수 있는 router들을 갖고 있는 파일을 require 합니다.
const indexRouter = require('./Routers');
//어느 폴더이든 그 안의 index.js는 파일 이름을 쓰지 않아도 index.js 가 requier 되는걸로 인식됩니다.
app.use("/", indexRouter);// '/'로 시작하는 모든 요청은 indexRouter 로 연결

//요청 -> http://localhost:3000/
//indexRouter내의 router.get('/', (req,res)=>{})와 연결
//요청 -> http://localhost:3000/about
//indextRouter내의 router.get('/about',(req, res)=>{})와 연결

userRouter = require("./Routers/user");
app.use("/user", userRouter);

//요청 -> http://localhost:3000/user
//indexRouter내의 router.get('/', (req,res)=>{})와 연결
//요청 -> http://localhost:3000/user/search
//indextRouter내의 router.get('/search',(req, res)=>{})와 연결

app.listen(app.get("port"),()=>{
    console.log(app.get("port"),"포트 Open");
});