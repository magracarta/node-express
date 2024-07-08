const express = require("express");
const router =express.Router();
const path = require("path");
const mysql = require("mysql2/promise");

async function getConnection(){
    return await mysql.createConnection({
        host : 'localhost',
        user:"root",
        password:"adminuser",
        database:"board"
    });
}

// const connection = mysql.createConnection({
//     host:"localhost",
//     user:'root',
//     password:'adminuser',
//     database:'board'
// });

router.post("/login",async (req,res,next)=>{
    const {userid, pwd} = req.body;
    const sql = "select * from member where userid = ?";

    
    try{
        const connection = await getConnection();
        const [rows, fields] = await connection.query(sql , [userid]);
        if(rows.length == 1){
            if(rows[0].pwd == pwd){
                const uniqueInt = Date.now();
                req.session[uniqueInt] = rows[0];
                res.cookie('session',uniqueInt,{httpOnly:true, path:"/"});
                res.json({msg:'ok'});
            }else{
                res.json({msg:'비밀번호가 맞지 않습니다.'});
            }
        }else{
            res.json({msg:'아이디가 없습니다.'});
        }
    }catch(err){
        next(err);
    }
   
   
    // connection.query(sql, [userid], (err, rows)=>{
    //     //sql : 실행될 sql 문
    //     //[userid] : ? 에 대응되는 값을 저장한 변수, 여러개면 컴마로 구분해서 나열
    //     //row 에는 검색결과(레코드는 객체로, 객체들은 배열형태로 저장됨), error 에러내용이 저장되면서 익명함수가 실행됩니다.
    //     if(err){
    //         next(err);
    //     }else{
    //         if(rows.length == 1){
    //             if(rows[0].pwd == pwd){
    //                 const uniqueInt = Date.now();
    //                 req.session[uniqueInt] = rows[0];
    //                 res.cookie('session',uniqueInt,{httpOnly:true, path:"/"});
    //                 res.json({msg:'ok'});
    //             }else{
    //                 res.json({msg:'비밀번호가 맞지 않습니다.'});
    //             }
    //         }else{
    //             res.json({msg:'아이디가 없습니다.'});
    //         }
    //     }
    // });

});


router.get("/joinForm",  (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','/views/joinForm.html'));
});

router.post("/idcheck",async(req,res,next)=>{
    const userid = req.body.userid;
    const sql = "select * from member where userid = ?";
    try{
        const connection = await getConnection();
        const [rows, fields] = await connection.query(sql, [userid]);
        if(rows.length > 0){
            res.json({id:1});
        }else{
            res.json({id:0});
        }
    }catch(err){
        next(err);
    }
});

router.post("/join",async(req,res,next)=>{
    const {userid, pwd, name, email, phone} = req.body;
    try{
        const sql = "insert into member(userid, pwd, name, email, phone) values(?,?,?,?,?)";
        const connection = await getConnection();
        const [result, fields] = await connection.query(sql,[userid, pwd, name, email, phone]);
        console.log(result);
        console.log(fields);
        res.json({msg:'회원가입이 완료되었습니다. 로그인하세요.'});
    }catch(err){
        res.json({msg:'회원가입에 오류가 있습니다. 관리자에게 문의하세요.'});
    }
});


router.get("/logout", (req,res)=>{
    delete req.session[req.cookies.session];
    res.clearCookie('session', {httpOnly:true , path:'/'});
    res.redirect("/");
});

router.get("/updateForm",  (req,res)=>{
    res.sendFile(path.join(__dirname,"../","views/updateMemberForm.html"));
});

router.post("/update", async (req,res)=>{
    const {userid, pwd, name, email, phone} = req.body;
    try{
        const sql = "update member set pwd =? , name =? , email=? , phone =? where userid = ?"
        const connection  = await getConnection();
        const result = await connection.query(sql,[ pwd, name, email, phone,userid]);
        req.session[req.cookies.session] = {userid, pwd, name, email, phone};
        res.send("ok");
    }catch(err){
        next(err);
    }
});

// router.get("/deleteMember", async (req,res)=>{
//     const userid = req.session[req.cookies.session].userid;
//     const sql = "delete from member where userid = ?";

//     try{
//         const connection = await getConnection();
//         const result = await connection.query(sql,[userid]);
//         delete req.session[req.cookies.session];
//         res.clearCookie("session",{httpOnly:true, path:"/"});
//         res.redirect("/");
//     }catch(err){
//         next(err);
//     }
        
    
// });

router.get("/loginUser",(req, res)=>{
    const loginUser = req.session[req.cookies.session];
    res.send(loginUser);
});


router.delete("/deleteMember/:userid", async (req,res)=>{
     const sql = "delete from member where userid = ?";
    try{
        const connection = await getConnection();
        const result = await connection.query(sql,[req.params.userid]);
        delete req.session[req.cookies.session];
        res.clearCookie("session",{httpOnly:true, path:"/"});
        res.send("ok");
    }catch(err){
        next(err);
    }
});

module.exports = router;



