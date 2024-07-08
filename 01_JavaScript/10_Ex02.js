//10_Ex02,js


//배열 자료를 반복실행을 이용하여 학생단위의 객체로 저장하고 다시 객체 배열로 구성하여 for문을 이용해 학생별로 출력하세요.
const names = ['홍길동','홍길서', '홍길북', '홍길남'];
const kors = [98,78,56,89];
const mats = [85,57,48,69];
const engs = [88,99,69,78];

const students = [];
//위 배열에 생성자로 생성된 학생 객체를 요소로 추가하세요.(반복문 이용)

function student(name, korean, math, enlish){
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.enlish = enlish;
}

names.forEach((elem, i)=>{
    students.push(new student(elem, kors[i] , mats[i], engs[i]));
    console.log(students[i]);
});

//for(v of students) console.log(v);
