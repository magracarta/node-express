//07_Array.js
// index(번호) 를 사용하여 여러자료를 한곳에 모아 사용하는 자료구조

//다양한 자료를 하나의 범주안에 넣고 인덱싱(번호)을 이요해 컨트롤하는 변수
var array = [273,'string',true , function(){} , {} , [150,170]];
console.log(array[0]);

array.forEach((elem)=>{
    if(elem.isArray){
        elem.forEach(el=>{
            console.log(el);
        })
    }else{
        console.log(elem);
    }
});


for(let v of array){
    console.log(v);
}

for(let v in array){
    console.log(v);
}


console.log("-----------------------------------------------------------------------------");
//배열의 내용을 볼수있는 방법 #3
var arr = ['a','b','c','d'];
//arr.map(); //()안의 익명함수를 하나 넣을건데 그 익명함수를 배열의 요소들을 대상으로 한번씩 실행
//arr.map(function(){}); //익명함수가 배열의 요소갯수만틈 여러번 실행. 마치 반복실행처럼
arr.map((value, idx)=>{
    //valie:배열의 요소들이 한번씩 저장될 변수
    //idx : 그요소들의 첨자
    console.log(`index: ${idx}, value:${value}`);
});

console.log("map 명령 종료");



//배열의 내용을 볼수 있는 방법 #4
//for문


console.log("-----------------------------------------------------------------------------");
