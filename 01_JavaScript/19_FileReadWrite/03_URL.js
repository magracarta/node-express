//03_URL.js
const url = require('url');

const {URL} = url; //url 객체에서 URL 필드 값 (변수, 함수 , 객체) 만 구조분해를 통해 추출해 냅니다.
const myURL = new URL('hppt://www.daum.net/book/bookList.aspx?secrate1=001001000#anchor');
console.log('new URL() : ' , myURL);
console.log('url.format() : ', url.format(myURL));

console.log('-------------------------------------');
const parseURl = url.parse('hppt://www.daum.net/book/bookList.aspx?secrate1=001001000#anchor');
console.log('url.parse():', parseURl);
console.log('url.format():' , url.format(parseURl));
//인터넷 주소를 parse 함수로 분해해서 각각의 요소들을 따로 분리하고 사용할 수 있스빈다.
console.log(parseURl.query);//파싱된 주소에서 쿼리만 분리하여 출력