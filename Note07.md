### 프로젝트 소개
* https://github.com/landvibe/inflearn-react-project
* 디자인 시스템으로 ant.design 사용

### 프로젝트 설정하기
* 타입 정의
-prop types 런타임에 타입 체크
-js doc 컴파일 타임에 타입 체크, 타입 오류를 바로바로 확인 할수 있다

### 서버 API 호출하기
```
// util/api.js

// 1번
@param {object=} param.params

// 2번
axios({
  withCredentials: true,
}).then(response => {
  ...
});

// 3번
const { resultCode, resultMessage } = response.data;
```
* 1번) = 표시는 optional 이 값을 입력하지 않아도 된다는 의미
* 2번) 사용자 인증을 위해서 토큰을 쿠키로 저장해서 왔다갔다 할껀데 그게 동작하려면 이 옵션을 주어야 합니다
* 3번) api가 응답하는 데이터에는 항상 resultCode와 resultMessage가 들어있다  
정상적일 때는 resultCode가 0으로 오고, 에러가 날 때는 0보다 작은값이 온다
