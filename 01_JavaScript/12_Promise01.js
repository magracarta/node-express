//12_Promise01.js

// 함수와 비슷한 기능을 갖고 있는 "객체"
// 객체 내에 익명 함수 하나를 품고 있고,
// 익명함수를 실행하고 결과를 보관하고 있다가,
// 결과가 필요할 때 함수 실행결과를 전달 받아 사용할 수 있게 해주는 구조의 객체
// 비동기식 실행입니다.

// promise 객체의 전달인수 없는 선언문
// const pm = new Promise(/* 익명함수 */);
// promise 객체는 생성자의 전달인수로 현재 promise 객체의 기능을 갖는 익명함수를 전달하여야 생성됩니다.

//promise 객체 생성 예
const pm = new Promise((resolve, resject)=>{});

let func = (resolve, resject)=>{ }
const pm1 = new Promise(func);
//----------------------------------------------------------------------------------

//매개 변수 resolce 와 reject에는 함수가 전달되서 resolve() , reject() 형식으로 함수가 호출되는 명령이 작성됩니다.
const pm2 = new Promise((resolve, reject)=>{
    resolve();
    //또는 reject();
});
//resolve와 resject 변수에 전달되는 함수는 promise객체가 자체적으로 전달해 줍니다.
//----------------------------------------------------------------------------------

// 익명함수 안에서 promise 에 부여된 임무를 코드들이 실행되면서 같이   resolve() , reject() 가 선택실행됩니다.

const pm3 = new Promise((resolve, reject)=>{
    //명령 1 , 명령 2 ....
    if(/* 조건 */ true /* or false */){
        resolve();
    }else{
        reject();
    }
});

//--------------------------------------------------------------------------------------------------------

// resolve와 reject() 함수를 호출할 때, 이 프로미스객체를 사용할 지점에 전달인수를 전잘할 수 있ㅅ습니다.
const pm4 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //명령1 , 명령2....
        if(/*조건*/ true /*or false*/){
            resolve('성공');
        }else{
            reject('실패');
        }
    },3000);
})
//위에 얺은 전달인수는 반드시 String 데이터 이어야하는것은 아닙니다. 어떤 유형에 데이터가 전달될 수 있습니다.
//주로 promise결과를 사용할 곳에서 유용하게 사용할 데이터를 전달합니다.
//String ,Number , 배열 객체 등 모두 전달이 가능합니다.

//promise 객체의 실행결과 활용 (결과를 품고 잇는 객체를 필요에 의해 필요한 때에 별도 활용할 수 있습니다.)
//pm4.then();
//pm4.catch();

//pm4.then().catch();

// resolve()가 호출된 경우 then 안의 익명함수가 실행되고,
// reject()가 호출되거나 pm에 오류가 있는 경우 catch안의 익명함수가 실행됩니다.
pm4
.then((message)=>{
    console.log(message);
}).catch((message)=>{

    console.log(message);
});


//resolve 와 reject에 전달된 값들은 위의 message매개변수에 저장됩니다.



console.log("----------------------------------");
let condition = true; //특정 상황을 만들기 위한 상태값.
const pm5 = new Promise((resolve, reject)=>{
    if(condition){
        resolve("condition값은 true입니다.");
    }else{
        reject("condition값은 true입니다.");
    }
});

pm5.then((msg)=>{
    console.log(msg);
})
.catch((msg)=>{
    console.log(msg);
}).finally(()=>{
    console.log("promise 가 종료되엇습니다.");
})