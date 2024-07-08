//09_Object02.js

//객체와 String 자료의 변수 & 함수 이름 활용
let sayNode =()=>{
    console.log('Node');
}

let myName = 'Node.js';

const myObj = {
    // 이름이 myName 이라는 멤버 변수를 만들고, 값으로 'Nodejs'라는 String 값을 저장하려고 합니다.
    // myName:'Nodejs',
    // myName : myName,//값이 쓰일 위치에 동알한 값을 갖고 있는 변수이름을 사용
    //맴버 변수의 이름과 대입할 값을 갖고 있는 변수 이름이 같다면
    myName,
    //위와 같이 한번만 써도 myNmae:myName, 이렇게 쓴걸로 인식된다.
    //sayNode : sayNode,
    sayNode,
};

console.log("멤버 변수 myName 값 : " , myObj.myName);
console.log("멤버 변수 sayNode 값 : " , myObj.sayNode);
myObj.sayNode();

const myObj2 = {myName,sayNode};

console.log("----------------------------------------------------------------------");
//obj3객체를 만들고 ES6 이라는 멤버변수를 만들고, 'Fantasic'이라는 값을 저장하려고 한다면
const obj3 = {};
//obj3.ES6 = 'Fantastic';
//obj3.['ES6'] = 'Fantastic';

let v = 'ES';
obj3[v+'6'] = 'Fantastic';
console.log("멤버변수 ES6 값 : " , obj3.ES6);


//위 내요을 모두 종합한 객체 생성
const newObj = {
    myName,
    sayJS : ()=>{console.log('js')},
    sayNode,
    [v+6]:'Fantastic',
}

console.log(newObj.myName);
newObj.sayNode();
newObj.sayJS();
console.log(newObj.ES6);
