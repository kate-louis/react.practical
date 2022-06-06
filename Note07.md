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

// 4번
http://localhost:3001/user/search?keyword=u
```
* 1번) = 표시는 optional 이 값을 입력하지 않아도 된다는 의미
* 2번) 사용자 인증을 위해서 토큰을 쿠키로 저장해서 왔다갔다 할껀데 그게 동작하려면 이 옵션을 주어야 합니다
* 3번) api가 응답하는 데이터에는 항상 resultCode와 resultMessage가 들어있다  
정상적일 때는 resultCode가 0으로 오고, 에러가 날 때는 0보다 작은값이 온다
* 4번) autoCompletes 데이터 구조 확인, 데이터의 배열이 들어있음

### 사용자 페이지 구현하기

### makeFetchSaga로 API 통신 상탯값 관리하기
```
// 1번 (saga.js)
export default function() {
  yield all([
    takeEvery(
      Types.FetchUser, 
      makeFetchSaga({ fetchSaga: fetchUser, canCache: true})
    ),
  ]);
}

// 2번 (User.js)
const { isFetched } = useFetchInfo(Types.FetchUser);

// 3번 (state/index.js)
const INITIAL_STATE = {
  fetchInfo: {
    fetchStatusMap: {}, // Request, Success, Fail
    isSlowMap: {}, // boolean 응답이 0.5초가 지나도 오지 않으면 true
    totalCountMap: {}, // 페이지네이션
    errorMessageMap: {}, // 에러메세지 
    nextPageMap: {}, // 페이지네이션
  },
}
```
사가 미들웨어 <-> makeFetchSaga <-> 사가 함수
* 1번) makeFetchSaga (제너레이터)
-모든 Fetch Saga는 makeFetchSaga라는 함수를 호출하도록 할겁니다
-canCache 값이 true 이면 정해진 시간동안 해당 API가 응답하는 값을 캐싱하고 
캐싱된 데이터가 있으면 액션이 발생했을 때 API를 호출하는게 아니라 그 cache를 활용할겁니다.
-fetch 상태값을 관리를 해줌 통신 진행중인지, 통신상태가 느린지 등등
* 2번) 상태값이 필요할 때 
* 3번) 이 모든 데이터는 각 액션마다 어떤 상태인지 나타낸다
* fetchKey는 optional, 한가지 액션을 이용해서 여러개의 상태값으로 관리하고 싶을 때 이용
* Symbol로 관리를 하면 이름 충돌 문제를 해결

### SPA 초기 로딩 처리하기
* loading.io/css/
* 로딩은 컴포넌트가 마운트 된 다음에 제거

### 사용자 정보 수정하기
* redux-saga
-takeEvery: 모든 클릭이 실행됨  
-takeLatest: 연속된 클릭 방지 (마지막 것만 실행해줌)  
-takeLeading: 연속된 클릭 방지 (첫번째 것만 실행해줌)  
-throttle: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 함  
-debounce: 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출

### 태그 정보 수정하기
* FetchLabel 컴포넌트의 역할은 api 응답이 느리면 로딩을 보여주는 것
* 소속이나 태그 모두 positive 방식으로 동작을 하기 때문에 api 응답이 안 와도 바로바로 값을 바꿔주고 있다

### 수정 내역 구현하기
* 히스토리 API http://localhost:3001/history

### 인증 화면 만들기

### 인증 API 호출하기
* fetchUser 사가함수에서는 /auth/user 라는 API 호출하면 서버에서는 쿠키를 이용해서 사용자 이름을 내려준다
* fetchUser는 App 컴포넌트에서 사용, App이 마운트 됐을 때 액션이 발생, dispatch는 일반적으로 변하지 않는다

### 프로젝트 마무리하기
```
// 1번 (search/saga.js)
function* fetchAllHistory(_, page) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/history',
    params: {page}
  });
  ...
}

// 2번 (search/index.js)
export const actions = {
  ...
  fetchAllHistory: () => ({ type: Types.FetchAllHistory, [FETCH_PAGE]: 0 }),
}
```
* User 컴포넌트가 언마운트될 때 initialize 액션을 날린다,   
즉 유저페이지를 벗어날 때 모든 상태값을 초기화
* 1번) 페이지네이션은 숙제
-API로 페이지네이션은 구현되어 있음  
-페이지네이션 API http://localhost:3001/history?page=0  
뒤에 파라미터 없이 호출하면 첫번째 페이지만 반환함
-fetchAllHistory의 page 번호는 자동으로 하나씩 증가함
* 2번) 페이지 초기화 하고 싶을 때
* 스크롤을 하면 자동으로 다음 페이지를 받아오는 기능을 무한 스크롤이라 부르는데,  
무한 스크롤을 구현할 때 Intersection Observer API를 이용하면 됨
