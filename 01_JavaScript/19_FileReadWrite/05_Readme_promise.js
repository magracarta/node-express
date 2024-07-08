//05_Readme_promise.js

//파일 입출력을 위한 모듈의 promise포함하여 로딩합니다.


// fs.readFile('./Readme.txt')
// .then().catch().finally();

const fs = require('fs').promises;
//fs 의 readFile 함수안에 Promise 객체를 리턴하는 기능이 담겨 있는걸 이용하겠다는 뜻

// const pm = fs.readFile('./Readme.txt');
// console.log("파일 리딩 시작");
// pm.then((data)=>{
//     console.log(data.toString());
// }).catch((error)=>{
//     console.error(error);
// }).finally(()=>{

// });
// console.log("파일 리딩 종료")


//readFile 함수를 동기식으로 전환하여 호출 실행
async function abcd(file){
    try{
        console.log("파일 리딩 시작2");
        const result = await fs.readFile(file);
        console.log(result.toString());
        console.log("파일 리딩 종료2");
    }catch(error){
        console.error(error);
    }
}

abcd('./Readme.txt');
