//13_Promise02.js

// Promise 의 다른 실행 형태
let condition = true;


function cllPromise(){
  return  new Promise((resolve, reject)=>{
        // 이곳에 파일 입출력 멸령 또는 네트워크 송수신 명령이 기술된다.
        if(condition){
            console.log("1: resolve");
            resolve('값1');
        }else{
            console.log("2: reject");
            reject();
        }
  });

}


cllPromise().then(resopnse =>{
    console.log(resopnse);
    console.log("3. 성공");
}).catch(resopnse=>{
    console.log("4. 실패");
    
}).finally(()=>{
    
    console.log("6. 프로미스 종료");
});

async function func(){
  try{
      
      let result =  await cllPromise();
      console.log("비동기 실행 결과 : " , result);
  } catch(err){
      console.error(err); // console.error()는 console.log()와 크게 차이는 없지만 에러 출력시 주로 사용합니다.
  }
}

func();