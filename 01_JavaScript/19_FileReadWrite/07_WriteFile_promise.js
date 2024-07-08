//07_WriteFile_promise.js

const fs = require('fs').promises;

// fs.writeFile('./writeMe2.txt', '안녕하세요\n반갑습니다.')
// .then(()=>{
//     return fs.readFile('./writeMe2.txt')
// }).then((data)=>{
//     console.log(data.toString());
// }).catch((err)=>{
//     console.error(err);
// }).finally(()=>{
//     console.log("파일 쓰기가 종료되었습니다.");
// });


async function abcd(){
    try{
        await fs.writeFile('./writeMe3.txt', '안녕하세요,\n반갑습니다.\n 어서오세요.');
        const result = await fs.readFile('./writeMe3.txt');
        console.log(result.toString());
    }catch(err){
        console.log(err);
    }
}

abcd();

