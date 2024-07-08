//04_Server.js

const http = require("http");
const fs = require("fs").promises;

const users = {};

http.createServer(async (req, res)=>{
    try{
        if( req.method == "GET" ){
            if(req.url === "/") return gourl("./04_index.html",res);
            else if(req.url === "/about") return gourl("./04_about.html",res);
            else if(req.url === "/user"){
                res.writeHead(200,{'Content-Type':'application/json;  charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
        }else if(req.method=="POST"){
            if(req.url === "/user"){
                req.on('data',(data)=>{
                   // console.log(data);
                    let body = data.toString();
                    //console.log(body);
                    const {username} = JSON.parse(body);
                    //console.log(username);
                    const id = Date.now(); //현재시간 날짜를 밀리초로
                    users [id] = username;
                    console.log(users);
                    return res.end("ok");
                });
            }
            
        }else if(req.method=="PUT"){
            if(req.url ==="/user"){
                req.on('data',(data)=>{
                    let body = data.toString();
                    const {key, username} = JSON.parse(body);
                    users[key] = username;
                });
                return res.end('ok');
            }
        }else if(req.method == "DELETE"){
            if(req.url.startsWith("/user")){
                let urlarr = req.url.split("/");
                const key = urlarr[2];
                delete users[key];
                return res.end('ok');
            }
        }
    }catch(err){
        console.error(err);
    }
}).listen(3000,()=>{console.log("3000포트에서 서버가 대기중......")});


async function gourl( responseurl,res){
    const data = await fs.readFile(responseurl);
    res.writeHead(200,{'Content-Type':'text/html;  charset=utf-8'});
    return res.end(data);
}