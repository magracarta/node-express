//kakaostrategy.js
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const mysql = require("mysql2/promise");


async function getConnection(){
    return mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"adminuser",
        database:"nodegram"
    });
}
//카카오 로그인에 필요한 동작은 익명함수에 기술되고 그 익명함수 export되며, 이를 passport폴더에 같이 있는 index.js에서 require해서 사용할 예정입니다.

module.exports = ()=>{
    passport.use(
        new KakaoStrategy(
            {
                //아래 정보로 사용자 인증 절차가 진행됩니다.
                clientID : process.env.KAKAO_ID,
                callbackURL : '/user/kakao/callback',
            },
            async(accesttToken , refreshToken, profile , done)=>{
                //사용자 인증이 완료되어 사용자 정보가 전달되었습니다.
                console.log(profile._json.kakao_account.email , profile.id , profile._json.properties.nickname);
                console.log(profile);
                try{
                    //토큰으로 받아온 사용자 정보로 조회하고 회원가입합니다.
                    let sql = "select * from user where email = ?";
                    let connection = await getConnection();
                    let[rows , fields] = await connection.query(sql , [profile._json.properties.nickname]); //이메일로 회원유무 조회
                    //회원 가입 내역에 따라 회원 가입 후 또는 바ㅏㅗㄹ done 함수를 실행하여 다음 로그인 절차를 진행합니다.
                    if (rows.length >= 1){
                        //바로 
                        done(null , rows[0]);
                        //null : 로그인에 에러가 없음을 의미.
                    }else{
                        //회원 가입 후 
                        sql = 'insert into user(email , snsid , nickname , provider) values (?, ?, ?, ?)';
                        [rows , fields] = await connection.query(sql , [profile._json.properties.nickname,  profile.id , profile._json.properties.nickname , 'kakao']);
                        //방금 회원가입한 사용자를 조회
                        //방금 추가한 레코드 다시 검색 후 done 실행
                        sql = "select * from user where email =?";
                        [rows , fields] = await connection.query(sql , [profile._json.properties.nickname]);
                        done(null , rows[0]);
                        //null : 로그인에 에러가 없음을 의미.
                    }
                }catch(err){
                    console.error(err);
                    done(err);
                }
            }

        )
    )
}
