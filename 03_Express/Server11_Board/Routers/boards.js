const express = require("express");
const router =express.Router();
const path = require("path");
const mysql = require("mysql2/promise")
const multer = require("multer");

async function getConnection(){
    return await mysql.createConnection({
        host : 'localhost',
        user:"root",
        password:"adminuser",
        database:"board"
    });
}

const multerObj = multer({
    storage : multer.diskStorage({
        destination(req,file, done){
            done(null, "uploads/");
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null,path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits:{
        fileSize:1024*1024*5
    },
});

router.post("/imageup",multerObj.single("image"),(req,res)=>{
    console.log("savefilename: " , req.file.filename);
    console.log("filename: " , req.file.originalname);
    res.json({image:req.file.originalname, savefilename : req.file.filename })
});

router.get("/boardList",(req,res)=>{
    res.sendFile(path.join(__dirname,"/..","/views/boardList.html"));
});


router.get("/boards",async (req,res, next)=>{
    const sql = "select * from board order by num desc";
    try{
        const connection = await getConnection();
        const [rows, fields] = await connection.query(sql);
        // rows 에는 하나의 레코드가 하나의 객체 형태로, 그리고 여러 레코드는 객체를 요소하는 배열 형태로 조회
        // [{num:1, writer : 'scott', title:'안녕하세요', ...},{} ,{} ,{} ....]
        res.send(rows);

    }catch(err){
        next(err);
    }
});


router.get("/boardView/:boardnum", async (req, res,next)=>{
    const sql = "update board set readcount = readcount + 1 where num = ?";

    try{
        const connection = await getConnection();
        const result = await connection.query(sql,[req.params.boardnum]);
        
        req.session.boardnum = req.params.boardnum;
        res.sendFile(path.join(__dirname,"/..","/views/boardView.html"));
    }catch(err){
        next(err);
    }
  
});

router.get("/boardViewWithoutCnt", async (req, res,next)=>{
    res.sendFile(path.join(__dirname,"/..","/views/boardView.html"));
  
});

router.get("/getBoard",async (req, res,next)=>{
    const num = req.session.boardnum;
    const sql = "select * from board where num = ?";
    try{
        const connection = await getConnection();
        const [result, fields] = await connection.query(sql,[num]);
        res.send(result[0]);
    }catch(err){
        next(err);
    }
});



// router.get("/getboard/:boardnum", async(req,res,next)=>{
//     const sql = "select * from board where num = ?";
//     try{
//         const connection = await getConnection();
//         const [result, fields] = await connection.query(sql,[req.params.boardnum]);
//         res.send(result[0]);
//     }catch(err){
//         next(err);
//     }
// })

const upObj = multer();
router.post("/writeBoard",upObj.single("image") , async(req,res,next)=>{
    const {userid, pwd, email , title , content, image, savefilename} = req.body;
    const sql = "insert into board (userid , pass , email , title , content, image, savefilename ) values (?, ?, ?, ?, ?, ?, ?)";
    try{
        const connection  = await getConnection();
        const result = await connection.query(sql, [userid, pwd, email , title , content, image, savefilename]);
        res.send('ok');
    }catch(err){
        next(err);
    }
});


router.get("/boardWriteForm",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"/..","/views/boardWriteForm.html"));
});

router.post("/updateBoard" , upObj.single("image"), async(req,res,next)=>{
    const {userid, pass, email , title , content, img, savefilename} = req.body;
    const sql = "update  board set userid =? , pass = ? , email =? , title =? , content = ?, image = ?, savefilename =?  where num = ?";
    try{
        const connection  = await getConnection();
        const result = await connection.query(sql, [userid , pass, email , title , content, img, savefilename , req.session.boardnum ]);
        res.send('ok');
    }catch(err){
        next(err);
    }
});

router.get("/updateBoardForm",(req,res)=>{
    res.sendFile(path.join(__dirname,"/..","/views/boardUpdateForm.html"));
});

router.post("/insertReply", async(req,res,next)=>{
    const {userid , boardnum ,content  } = req.body;

    try{
        const connection = await getConnection();
        const sql = 'insert into reply (boardnum , userid, content)  values ( ? , ? , ?)';
        const result= await connection.query(sql, [boardnum , userid , content]);
        res.send({msg:"ok"});
   }catch(err){
    console.error(err);
    next(err);
   }
});

router.get("/getReplys", async (req,res,next)=>{
   const boardnum = req.session.boardnum;
   try{
        const connection = await getConnection();
        const sql = 'select * from reply where boardnum = ? order by replynum desc';
        const [rows, fields] = await connection.query(sql, [boardnum]);
        res.send(rows);
   }catch(err){
    console.error(err);
    next(err);
   }
});

router.delete("/deletReply/:replynum",async(req,res,next)=>{
    try{
        const connection = await getConnection();
        const sql = 'delete from reply where replynum = ? ';
        const result = await connection.query(sql, [req.params.replynum]);
        res.send("ok");
   }catch(err){
    console.error(err);
    next(err);
   }
});
module.exports = router;

