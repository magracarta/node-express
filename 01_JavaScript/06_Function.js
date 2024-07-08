//06_Function.js

//함수의 호출 형태를 나누는 기준(전달 인수(매개변수)의 유무, 리턴값의 유무)
function abc(){

}

function abc(x,y){

}


function abc(x,y){
    return z;
}

//전달인수로 함수가 전달되는 경우
const add =(x,y)=>{
    return x+y; 
}
const sub = (x,y)=>{
    return x-y; 
}

function cal(a,b , func){
  const res = func(a,b);
  return  res;
}


let result = cal(10,5,add);
console.log(result);

result = cal(10,5,sub);
console.log(result);


//리턴값이 익명함수인 경우
console.log("---------------------------------");
function cal2(){
    return function(x,y){return x%y; };
}

const rem = cal2();

result = rem(80,13);
console.log(`리턴의 결과 : ${result}`);


//  ArrorwFunction
//원래 함수의 모습
//function abc(x,y){return x+y; }
//익명함수를 이용한 모습
let abc2 = (x,y)=>{
    return x+y;
}

//화살표 함수의 표현 방법 #1
const abc3 = (x,y)=>{
    return x+y;
}
console.log(`호출결과 ${abc3(10,20)}`);
//만약 매개변수가 없는 함수라면 괄호만 표현합니다.
const abc4 = ()=>{
    return 100;
}

//만약 매개변수가 하나라면 아래와 같이 괄호를 생략하기도 합니다.
const abc5 = x =>{
    return 100;
}

//함수의 푠현 방법 #2
//함수의 내용이 리턴만 있는경우
//const add = (x,y) => {return x+y};

const add6 = (x,y) => x+y;
const add7 = (x,y) => (x+y);
//매개변수도 하나 함수 몸체도 리턴만 있다면
const square1 = x => x*x;
//원래 모습
function square2(x){
    return x*x;
}


//매개변수 없고 리턴값이 없는 함수
const func1 = ()=>{
    console.log('func = () =>{}  매개변수없고 리턴값 없는 함수');
}
func1();


//매개변수(전달인수) 있고 리턴값이 없는 함수
const func2 =(x,y)=>{
    console.log(`func2=(x,y)=>{} 매개변수- 전달인수(${x},${y}) 있고 리턴값 없는 함수`);
}

func2(30,40);

//매개변수 있고 리턴값이 있는 함수
const func3 =(x,y)=>{
    console.log(`func3=(x,y)=>{ return } 매개변수- 전달인수(${x},${y}) 있고 리턴값 있는 함수`);
    return x+y;
}

console.log('리턴값' + func3(30,40));