const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const { session } = require("passport");
const passport = require("passport");
const router = express.Router();

async function getConnection(){
    return await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"adminuser",
        database:"nodegram"
    });
}

router.post("/login",async (req,res)=>{
    let {email, password} = req.body.obj;
    let sql = "select * from user where email = ?";
    try{
        let connection = await getConnection();
        let [rows , fields] = await connection.query(sql,[email]);

        if(rows.length <= 0){
            res.json({"msg":"계정이 존재하지 않습니다."});
            return false;
        }
        let pwdresult =await bcrypt.compare( password , rows[0].pwd);
        if( pwdresult ){
            
            const uniquerInt = Date.now();
            req.session[uniquerInt] = rows[0];
            res.cookie('session',uniquerInt, {httpOnly:true, path:"/"});
            res.json({msg:'ok'});
        }else{
            res.json({"msg":"비밀번호가 틀립니다."});
            return false;
        }
      
       
    }catch(err){
        console.error(err);
    }

});


router.get('/joinform',(req,res)=>{
    res.sendFile(path.join(__dirname,"/..","/views/joinform.html"))
});

router.post("/join",async(req,res)=>{
    let {email, password ,nick} = req.body;
   console.log(req.body);

    try{
        let connection = await getConnection();
        let sql = "select * from user where email =?";
        let [rows1, fields1] = await connection.query(sql , [email]);
        if(rows1.length >= 1){
            res.json({msg : "이메일이 중복됩니다."});
            return false;
        }
        sql = "select * from user where nickname =?";
        let [rows2, fields2] = await connection.query(sql , [nick]);
        if(rows2.length >= 1){
            res.json({msg : "닉네임이 중복됩니다."});
            return false;
        }
        sql = "insert into user (email, pwd, nickname) values(?,?,?)";
        const hash = await bcrypt.hash(password,12);//pwd안호화
        let result = await connection.query(sql,[email, hash ,nick]);
        console.log(result);
        
        res.json({msg:'ok'})
        
    }catch(err){
        console.error(err);
    }

});

router.get("/getLoginUser", async (req,res)=>{
    const loginUesr = req.session[req.cookies.session];
    try{
        const connection = await getConnection();
        //내가 follow하는 유저들 : follwings
        //follow_from 에서 나를 조회해서 follw_to 들을 추출합니다.
        let sql = "select * from follow where follow_from = ?";
        let [rows, field] = await connection.query(sql,[loginUesr.nickname]);
        //rows는 {follow_from : 값 , follow_to:값}들로 구성된 객체 배열
        // let followings = rows.map((row)=>{
        //     return row.follow_to;
        // }); //row가 원래 배열이었기 때문에 각 요소들로 실행되고 리턴된 데이터로 다시 배열이 구성되고 결과가 followings 변수에 저장됩니다.
        
        let followings = (rows.length >= 1) ? rows.map((row) => row.follow_to) : [];
        sql = "select * from follow where follow_to = ?";
        [rows, field] = await connection.query(sql,[loginUesr.nickname]);
        followers = (rows.length >= 1) ? rows.map((row) => row.follow_from) : [];
    
        
         res.json({loginUesr:loginUesr , followers , followings});
    }catch(err){
        console.error(err);
    }
});



router.post('/follow', async(req,res,next)=>{
    const {follow_from , follow_to} = req.body;
    try{
        const connetcion =await getConnection();
        
        let [rows, field] = await connetcion.query("select * from follow where follow_from = ? and follow_to = ?",[follow_from , follow_to]);
        
        if(rows.length > 0) return res.send("no");
        [rows, field] = await connetcion.query("insert into follow (follow_from , follow_to) values(? ,? )",[follow_from , follow_to]);
        res.send('ok');

    }catch(err){
        console.error(err);
    }
});


router.get("/logout",(req,res)=>{
    if(req.cookies.session){
        delete req.session[req.cookies.session];
        res.clearCookie("session",({httpOnly:true, path:'/'}));
    }else{
        req.session.destroy(); //세션 쿠키 한번에 삭제
    }
   
    res.redirect("/");
});

router.post('/unfollow', async(req,res,next)=>{
    const {follow_from , follow_to} = req.body;
    try{
        const connetcion =await getConnection();
        [rows, field] = await connetcion.query("delete from follow where follow_from = ? and follow_to = ?",[follow_from , follow_to]);
        res.send('ok');

    }catch(err){
        console.error(err);
    }
});

router.get("/kakao", passport.authenticate('kakao'));

router.get('/kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect : '/main', //인증 & 회원가입 및 로그인 실패 했을 때 이동할 주소
    }),
    (req,res)=>{
        const uniquerInt = Date.now();
        req.session[uniquerInt] = req.user;
        res.cookie('session' , uniquerInt , {httpOnly:true , path: '/'});
        res.redirect('/feed/mainlist'); //성공했을 때 이동할 주소
    }
);


module.exports = router;