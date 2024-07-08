// func01.js
const value = require('./Var');
// export된 파일을 불러올때 .js는 생략 가능합니다.

// value = {odd : '홀수입니다.', even : '짝수입니다.'};

console.log(value);
let {odd, even} =value; //구조분해
// let {odd,even} = {odd:'홀수입니다.', even:'짝수입니다.'};

console.log(odd);
console.log(even);
