function Greeting({ isLogin, name, cash }) {
  return (
    <div>
      저희 사이트에 방문해 주셔서 감사합니다.
      {isLogin && (
        <div>
          {name}님 안녕하세요. <br />
          현재 보유하신 금액은 {cash}원입니다.
        </div>
      )}
      {!isLogin && isLogin2 && (
        <div>
          {name}님 안녕하세요. <br />
          현재 보유하신 금액은 {cash}원입니다.
        </div>
      )}
    </div>
  );
}

const v1 = 'ab' && 0 && 2; // v1 === 0
const v2 = 'ab' && 2 && 3; // v2 === 3
const v3 = 'ab' || 0; //v3 === 'ab'
const v4 = '' || 0 || 3; // v4 === 3 

 // && 연산자는 처음으로 거짓을 만나거나 아니면 끝까지 이동할 떄까지 평가
 // || 연산자는 처음으로 참을 만날 때까지만 평가
