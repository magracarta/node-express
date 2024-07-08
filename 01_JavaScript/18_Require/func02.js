//func02.js
const {odd, even} = require("./Var");




//정달인수의 값이 짝수인지 홀수인지를 판단하는 함수
function checkOddOrEven(number){
    if(number%2){
        return odd;
    }else{
        return even;
    }
}

//console.log( '함수실행 결과 : '+ checkOddOrEven(25));

module.exports = checkOddOrEven;
// module.exports = (number) => {
//     if(number%2){
//         return odd;
//     }else{
//         return even;
//     }
// };