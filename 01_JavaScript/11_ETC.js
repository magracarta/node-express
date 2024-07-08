//11_ETC.js
/*

//배열의 복사
let arr1 = [1,2,3,4];
//배열의 복사 [... 복사하려는 배열의 이름]
let arr2 = arr1;
console.log(arr1);
console.log(arr2);
arr1[0] = 100;
console.log(arr1);
console.log(arr2);


//배열 요소의 복사
let arr3 = [...arr1];
arr1[1] = 10;
console.log(arr3);
console.log(arr1);

let arr4 = [...arr3, 5];
console.log(arr4);

let arr5 =[...arr1, ...arr3];
console.log(arr5);


console.log("-----------------------------------------------------------------");

// 배열과 객체의 구조 분해


// 배열의 구조분해
let arr6 = [];
arr6.push("abcd");
arr6.push(100);
arr6.push({'a':200});


let arr7 = [0,1,2,3];
let zero, one , two ,three , four ,five;
// zero = arr7[0];
// one = arr7[1];
// two = arr7[2];
// three = arr7[3];
 
[zero, one, two , three] = arr7

console.log(zero, one , two , three);

//변수의 갯수를 조절해서 분해할당 하고싶지 않은 값을 조절할 수 있습ㄴ디ㅏ.
//[zero, one, two] = arr7;

//다수의 요소를 갑고 있는 배열에서 중간에 일부를 제회한 요소를 취할 때
[zero, , ,three] = arr7;
console.log(zero, three );


//배열의 요소 갯수보다 할당받을 변수의 갯수가 많다면 남는 변수값은 undeined가 됩니다.
[zero, one, two , three , four , five] = arr7;
console.log(zero, one , two , three,four ,five);

//2차원 , 3차원의 복잡한 배열의 구조분해
let arr8 = [0,1,2,[3,4]];
// 형태를 맞춰서 구조분해 연산을 실행합니다.
[zero,one,tow,[three, four]] = arr8;

console.log(zero, one , two , three,four ,five);

*/
//객체의 구조분해
//객체의 구조분해는 구조분해와 동시에 변수를 생성하여 실행하는것이 보통입니다.
let obj = {one:1, nine:9};
let {one,nine} = obj;

console.log(one , nine);
//필드명을 이용하여 객체의 구조분해를 할수 있으며, 이름이 맞지 않는 필드는 분해에서 제외시킬수 있습니다. 또한 필드로 존재하지 않는 변수는 undefined로 저장됩니다.

let {a1 , a2} = obj;
console.log(a1 , a2);



let three , four;
let obj1 = {three:3 , four:4};
//{three , four} = obj1; //  에러 : 이미 생성된 변수로 구조분해하는 
({three , four} = obj1); //객체를 별도의 변수에 저장하는 연산으로 '=' 이 쓰이는것이 아니라 구조분해하는것으로 인식하게 하기위해 ()를 사용합니다.
console.log(three, four);

console.log("---------------------------------------------------");
//구조분해를 이용한 함수의 매개변수
function fun4({one, two , three}){
    console.log(one, two, three);
}

let obj2 = {one:1 , two:2, three:3};
fun4(obj2);
fun4({one:4 , two:5 , three:6});

function fun5(a){
    console.log(a.one , a.plus.two,a.plus.five);
}
let obj3 = {one:5, plus:{two:2, five:5}};
fun5(obj3);



console.log("---------------------------------------------------");
// 구조분해 및 매개변수의 기본값 (default value)

//배열 구조분해 기본값
let [ar1 , ar2 , ar3 =5] = [1,2];//구조분해되는 변수에 기본값이 넣어서 전달값이 없어도 적영되게 합니다.
//let [ar1 , ar2 , ar3 =5] = [1,2,300];//이 경우 기본값 5은 지워지고 입력값 300이 ar3변수에 대입됩니다.
console.log(ar1 ,ar2 , ar3);
//객체 구조분해 기본값
let {ob1 , ob2 =7} = {ob1:6};
//let {ob1 , ob2 =7} = {ob1:6 , ob2:700}; //이 경우 기본값 7은 지워지고 입력값 700이 obj2 변수에 대입된다.

console.log(ob1 , ob2);

console.log("---------------------------------------------------");
let funcEx = (a = 100)=>{
    return a*20;
}

let result = funcEx();

console.log(`result : ${result}`);


//매개변수가 배열일 때의 기본값
let getTotal = ([one, two] = [10 , 20])=>(one+two);
result = getTotal();
console.log(`result Value : ${result}`);
console.log(`return Value : ${getTotal()}`);
console.log(`return Value : ${getTotal([30,40])}`);


//매개변수가 객체 일때의 기본값
let getValue = ({two:value} = {two:200})=> (value*20);
console.log(`return Value : ${getValue({two:300})}`);
console.log(`return Value : ${getValue()}`);




console.log("---------------------------------------------------");
//디스트럭처링 : 객체의 필드명을 문자열의 연사으로 조합하여 생성
let item = {
    ["one"+"two"]:12
};

console.log(`item 객체의 멤버변수 onetwo의 값 ${item.onetwo}`);

// item 변수에 앞서서 저장한 객체를 지우고 "tennis"라는 String 데이터를 저장합니다.
item = "tennis";

let sports={
    [item]:1,
    [item + "Game"] : "윕블던",
    [item + "Method"](){
        return this[item];
    }
};

console.log(`sport 객체의 멤버변수 값들 - tennis : ${sports.tennis} teenisGame${sports.Game} tennisMethod: ${sports.tennisMethod()}`);

console.log(sports[item+"Game"] , sports[item+"Method"]());



console.log("---------------------------------------------------");
//내장된 객체 : Number 객체
//표현 가능한 양의 정수 max 값

console.log("1. 표현 가능한 양의 정수 max 값 : " , Number.MAX_SAFE_INTEGER);
console.log("2. Math.pow(2,53)-1 : " , Math.pow(2,53)-1);
//Math.pow(a,b) : a의 b 자승

//-9007199254740991
console.log("3. 표현 가능한 음의 정수 min 값 : ", Number.MIN_SAFE_INTEGER);
console.log("4. -(Math.pow(2,53))-1 : ", -(Math.pow(2,53)-1));
console.log("------------------------------------------------------------------------");

// Number 객체에서 사용할 함수(메서드)
// 대상데이터가 정수인지 아닌지를 판별
//"Number.isInteger()" 함수 사용
let v =0;

console.log("1. 0 : " , Number.isInteger(v));
console.log("2. 1.0 : " , Number.isInteger(1.0)); //소수점 아래가 0이기 때문에 정수로 인식
console.log("3. -123 : " , Number.isInteger(-123));
console.log("4. '12' : " , Number.isInteger('12')); // false
console.log("5. 1.02 : " , Number.isInteger(1.02)); // false
console.log("6. NaN : " , Number.isInteger(NaN)); // false
console.log("7. true : " , Number.isInteger(true)); // false

//변수에 저장된 자료의 자료형을 알수 있는 함수 typeof 가 있지만 이는 자료형을 리턴해줄 뿐 , 필요에 의해 숫자인지 아닌지를 구분까지 하지는 못해서, 숫자가 반드시 필요한 경우의 구분을 Number.isInteger로 구분한다.


console.log("------------------------------------------------------------------------");
//String 데이터와 Number 테이터와의 관계
//자바에서 'A' -> integer 형변환하면 (int) 'A' -> 65  (int) 'B' -> 66  (char) 67 -> 'C'
//#$%&
console.log("1:",String.fromCodePoint(35,36,37,38)); // #$%&
console.log("2:",String.fromCodePoint(65,66,67,68)); // ABCD
console.log("3:",String.fromCodePoint(97,98,99,100)); //abcd
console.log("4:",String.fromCodePoint(48,49,50,51)); //0123
console.log("5:",String.fromCodePoint(0X31,0X32,0X33)); //16진수로 표현
console.log("5:",String.fromCodePoint(44032,44033,44034,44035)); //가각



console.log("------------------------------------------------------------------------");
//startWith : 대상 문자들이 지정한 글자로 시작하면 true 그렇지 않으면 false
let target = "123가나다";
console.log("1:", target.startsWith(123)); //true
console.log("2:", target.startsWith("23")); //flase
console.log("3:", target.startsWith("가나",3)); //인데스 3부터 "가나"로 시작 true
target = "123가나다456";
console.log("1: " , target.includes(2));//true
console.log("2: " , target.includes("가나"));//true
console.log("2: " , target.includes("12",5));//false


