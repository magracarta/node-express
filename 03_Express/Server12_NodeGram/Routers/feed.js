const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2/promise");
const { send } = require("process");
const router = express.Router();

async function getConnection(){
    return mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"adminuser",
        database:"nodegram"
    });
}

let multerOjj = multer({
    storage: multer.diskStorage({
        destination(req,file,done){
            done(null, "uploads/");
        },
        filename(req,file,done){
            let ext = path.extname(file.originalname);
            let fn = path.basename(file.originalname, ext)+Date.now()+ext;
            done(null,fn);
        }
    }),
    limits:({
        fileSize:1024*1024*5
    })
});

router.get("/mainlist",(req,res)=>{
    res.sendFile(path.join(__dirname,"/..","/views/mainlist.html"));
});

router.get("/feedWriteForm",(req,res)=>{
    res.sendFile(path.join(__dirname,"/..","/views/feedWriteForm.html"));
});

router.post("/imgup", multerOjj.single("img"),(req,res)=>{
    console.log(req.file.originalname);
    console.log(req.file.filename);

    res.json({"image":req.file.originalname , "savefilename": req.file.filename});
});


router.post("/writeFeed",async (req,res)=>{
    const {mywriter,content ,savefilename ,image } = req.body;
    try{
        const connection =await getConnection();
        //feed 테이블에 
        let sql = "insert into feed (content , image ,savefilename, writer) values(? , ?, ?, ?)";
        const [result , fields] = await connection.query(sql,[content , image , savefilename, mywriter]);
        feedid = result.insertId;
        console.log('feedid : ' + feedid );
        //content 에서 해시태그를 분리한다.
        const hashtags = content.match(/(?<=#)[^\s#]+/g);
        console.log(`해시테그들 : ${hashtags}`);
        
        if(hashtags){
            hashtags.map(async (tag,idx)=>{
                console.log(`-------tsg ${tag} ------------------`);
                //tag에 담긴 단어가 hashtag 테이블에 존제하는지 검색.
                sql = "select * from hashtag where word = ?";
                let [rows, field] = await connection.query(sql , [tag]);
                let tagid ='';
                if(rows.length >=1){ //이미 존재하는 해시 태그라면 그 word의 id만 추출
                    tagid = rows[0].id;
                }else{ // 없는 해시태그면 레코드 추가하고 추가된 id 저장
                    sql = "insert into hashtag (word) values (?)";
                    let [result2, field] = await connection.query(sql , [tag]);
                    tagid = result2.insertId;
                }

                console.log("해시태그 아이디 : " + tagid);

                //hash_feed 테이블에 피드 아이디와 태그아이디로 레코드를 추가
                sql = "insert into hash_feed(feed_id, hash_id) values(? , ?)";
                let [result3, field3] = await connection.query(sql , [feedid, tagid]);
            });
           
        }
        res.send({msg:"ok"});
    }catch(err){
        console.error(err);
    }
});


router.get("/getFeedList",async(req,res,next)=>{
    try{
        const connetcion =await getConnection();
        const [rows, field] = await connetcion.query("select * from feed order by id desc");
        res.send(rows);
    }catch(err){
        console.error(err);
    }
});

router.post('/search',async(req,res,next)=>{
    const {word} = req.body;
    try{
        const connection = await getConnection();
        // word 를 hashTag 테이블에서 검색
        let sql = "select * from hashtag where word = ? ";
        let [rows, fields] = await connection.query(sql,[word]);
        if(rows.length >= 1){
            // 검색된 word의 hashTag 테이블의 hash_id로 hash_feed 테이블에서 검색
             // 검색된 hashTag 테이블의 feed_id로 feed 테이블 검색
            let wordid = rows[0].id;
            sql = "select * from feed where id in (select feed_id from hash_feed where hash_id = ?) order by id desc";
            let [rows2,fields2] = await connection.query(sql , [wordid]);
            if(rows2.length >= 1){
                //검색된 feed들을 res로 전송
                res.send(rows2);
            }else{
                // 검색된 feed 들을 res 로 전송
                res.send([]);
            }

        }else{
            res.send([]);
        }
        

    }catch(err){
        next(err);
    }
});

module.exports = router;