//02_Server.js

const http =require('http');
const fs = require('fs').promises;


const server = http.createServer(async (req, res)=>{
  try{
    const data = await fs.readFile("./index.html");
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(data);
  }catch(err){
    console.error(err);
    res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
    res.end(err.mesage);
  }
});


server.listen(3000, ()=>{console.log("3000포트에서 서버 대기중....");});


//http 상태 코드
//2XX : 서버 전송 정상 종료.
//3XX : 리다이렉션 (다른 페이지로 이동) 을 알리는 상태
//4XX : 요청 오류를 타나낸다. 요청 자체에 오류가 있을 때 표시된다.
//5XX : 서버오류 - 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생한다.

