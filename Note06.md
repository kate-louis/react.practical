### 리덕스 소개
* 컴포넌트 코드로부터 상태 관리 코드를 분리할 수 있다
* 미들웨어를 활용한 다양한 기능 추가  
(데이터를 처리하는 중간 과정에서 어떤 로직을 넣어서 필요한 기능을 추가)
-강력한 미들웨어 라이브러리 (ex. redux-saga)  
-로컬 스토리지에 데이터 저장하기 및 불러오기
* SSR 시 데이터 전달이 간편하다
* 리액트 콘텍스트보다 효율적인 렌더링 가능

### 액션, 미들웨어
![Alt text](https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

***뷰 -> 액션 -> 미들웨어 -> 리듀서 -> 스토어 -> 뷰***
* 1번) 뷰에서 상태값을 변경하고 싶을 때 액션을 발생시킴
* 2번) 발생시킨 액션을 미들웨어가 처리
* 3번) 리듀서에서는 해당 액션에 의해서 상태값이 어떻게 변경되는지 그 로직을 담고 있음, 리듀서의 출력은 새로운 상태값
* 4번) 새로운 상태값을 스토어에게 알려주면 스토어가 상태값을 저장한다
* 4번) 스토어에 등록되어 있는 데이터에 관심 있는 옵저버들에게 데이터의 변경사실을 알려준다  
* 5번) 뷰가 그 이벤트를 받아서 화면을 갱신
* 리덕스에서는 데이터 변경하는 흐름이 단방향으로 이루어져 있음,  
이렇게 간단하고 직관적인 구조를 갖는 게 리덕스의 장점

***액션***
```
store.dispatch({ type: 'todo/ADD', title: '영화 보기', priority: 'hight' });

functino addTodo({ title, priority }) {
  return { type: 'todo/ADD', title, priority };
}
store.dispatch(addTodo({title: '영화 보기', priority: 'hight' }));
```
* 액션은 type 속성값을 갖고 있는 객체입니다
* dispatch는 액션이 발생했다는 것을 리덕스에게 알려주는 함수
* type 속성값 말고 원하는 대로 나머지 필요한 데이터를 전달할 수 있음
* 데이터는 리듀서에서 받아서 처리
* 액션을 구분하기 위해서 type 속성값을 사용, 그래서 유니크 해야함
* 보통 action creator 함수를 만들어서 사용함

***미들웨어***
```
const myMiddleware = store => next => action => next(action);

const middleware = store => next => action => {
  const result = next(action);
  return result;
};

// 1번
const reportCrash = store => next => action => {
  try {
    return next(action)l
  } catch(error) {
    // 서버로 예외 정보 전송
  }
}

// 2번
const delay = action.meta?.delay;
const delay = action.meta && action.meta.delay;
```
* 하나의 미들웨어는 이러한 함수입니다
* 처음에 함수를 실행하면 이 뒤에 있는 함수가 반환, 또 실행을 하면 그 뒤에 있는 함수가 반환, 최종적으로 next를 호출
* 세 번 감싸진 이유는 action => next(action) 함수에서 store와 next라는 것을 사용하기 위함입니다
* next라는 것도 리덕스에서 만들어서 넘겨준다, 다음에 호출될 어떤 함수를 넘겨줌
* 1번) 리듀서에서 뭔가 잘못 처리가 되었을 때 또는 예외가 발생했을 때,  
그것을 catch 해서 서버로 예외를 전송하는 기능
* 2번) 물음표 기호 (optional chaining)  
이 값(meta)이 undefined 라면 에러가 발생하는데 물음표 기호를 쓰면 에러가 발생하지 않는다

### 리듀서, 스토어
```
// 1번
prevState === nextState

// 2번
import produce from 'immer';
const person = { name: 'mike', age: 12 };
const newPerson = produce(person, draft => {
  dragt.age = 32;
});

// 3번
function createReducer(initialState, handleMap) {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const handler = handlerMap[action.type];
      if(handler) {
        handler(draft, action);
      }
    });
  };
}

// 4번
const store = createStore(rducer); // 스토어 생성

// 5번
store.subscribe(() => {
  ...
});
store.dispatch({ type ... });
```
***리듀서***
* 리듀서는 액션이 발생했을 때 새로운 상태값을 만드는 함수이다
* 리덕스의 상태값을 수정하는 유일한 방법은 액션 객체와 함께 dispatch 메서드를 호출하는 것
* 상태값은 불변 객체로 관리해야 합니다
* 리덕스가 처음에 실행될 때 state에 undefined를 넣어서 리듀서를 호출,  
-이때 초기 상태값을 설정  
-두번째 매개변수는 액션 객체가 넘어옴  
-액션 객체의 type에 따라서 해당하는 액션에 대한 처리를 해주면 된다
* 불변 객체로 관리하기 위해서 새로운 객체를 반환하고 있습니다
* 1번) 불변 객체로 관리했을 때의 장점은 이전 상태라 다음 상태를 단순 비교로 변경됐는지 확인할 수 있다는게 장점
* 2번) 객체를 불변 객체로 관리하는데 도와주는 immer 라이브러리 추천

***주의사항***
* 객체를 가르킬 때에는 객체의 레퍼런스가 아니라 고유한 아이디값을 이용하는게 좋음
* 리듀서는 순수 함수로 작성해야 한다, 순수함수가 되려면 부수 효과가 없어야 한다
부수 효과라는 것은 외부 상태를 변경하는 건데 eg) 서버 API 호출, 랜덤 함수 사용, 타임 함수 사용 

***스토어***
* 스토어는 상태값을 저장하는 역할도 있고 그리고 액션 처리가 끝났다는 것을 외부에 알려주는 역할도 합니다
* 5번) 액션 처리가 끝났다는 이벤트를 받기 위해서는 스토어의 subscribe 메서드를 호출해서 함수를 입력하면 된다,   
액션을 발생시켰을 때 각 액션에 대한 처리가 끝나면 이 함수가 호출된다

### react-redux 없이 직접 구현하기
 ```
// 1번
const [state, dispatch] = useReducer(reducer, initialState);
const [, forceUpdate] = useReducer(v => v + 1, 0);

// 2번 리덕스에서 timelines 데이터를 가져오기
 * let prevTimelines = store.getState().timeline.timelines;
 ```
 * 1번) [forceUpdate와 같은 것이 있습니까?](https://ko.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate)
 * 2번) [Store 메서드 getState()](https://redux.js.org/api/store)  
 애플리케이션의 현재 상태 트리를 반환합니다. 스토어의 리듀서가 마지막으로 반환한 값과 동일합니다.
 * 이렇게 이전 데이터를 관리하고 데이터가 변경됐을 떄만 컴포넌트가 렌더링 되게 하는 것이 react-redux의 중요한 역할 중의 한 가지

### react-redux 사용하기
```
// 1번
<Provider store={store}>
  <div> ... </div>
</Provider>

// 2번
const friends = useSelector(state => state.friend.friends);

// 3번
const [friends, friends2] = useSelector(state => [state.friend.friends, state.friend.friend2], shallowEqual);

// 4번
const dispatch = useDispatch();
```
* 1번) 리액트에서 액션이 처리됐을 때 이벤트를 받아서 하위에 있는 다른 컴포넌트가 다시 렌더링될 수 있도록 도와줍니다
* 기존의 강제 업데이트 forceUpdate 와 상태값 비교 로직 코드가 필요 없음 
* 2번) 리덕스에서 데이터를 가져올 때는 useSelector 훅을 사용,    
선택자 함수는 리덕스의 상태값이 매개변수로 넘어오고 사용하려는 데이터를 가져오면 된다
* useSelector 훅은 리덕스에서 액션이 처리가 되면 여기서 반환하는 갓의 이전값을 기억했다가 이 값이 변경되었을 때 이 컴포넌트를 다시 렌더링 해줍니다
* 3번) 여러 개의 상태값을 가져오고 싶을 때  
-배열 또는 객체 반환  
-매번 새로 생성으로 불필요한 렌더링 단점이 있음  
-해결책으로 두번째 매개변수 함수를 입력해서 렌더링 할지 말지 결정할 수 있음  
-보통은 react-redux에서 제공하는 shallowEqual을 이용하는 방법, 이 함수는 얕은 비교를 한다,  
이 안에 있는 friends와 friends2를 각각 비교하기 때문에 두 값이 변경되었을 때만 렌더링 된다
* 4번) 기존에 dispatch를 호출할 때 store를 가져와서 호출을 했는데 이제는 useDispatch 훅을 이용하면 된다

### reselect로 선택자 함수 만들기
```
// 1번
const [
  ageLimit, 
  showLimit, 
  friendsWithAgeLimit, 
  friendsWithAgeShowLimit] = useSelector(state => {
    const { ageLimit, showLimit, friends } = state.friend;
    // 2번
    const friendsWithAgeLimit = friends.filter(item => item.age <= ageLimit);
    return [
      ageLimit,
      showLimit,
      friendsWithAgeLimit,
      friendsWidthAgeLimit.slice(0, showLimit),
    ];
  }, shallowEqual); // 1번
```
* 리덕스에 저장된 데이터를 화면에 보여줄 때는 다양한 형식으로 가공할 필요가 있는데 그 때 reselect라는 라이브러리가 도움이 된다
* 리덕스에는 원본 데이터만 저장을 해 놓고 필터 연산은 컴포넌트 쪽에서 하는 방법
* 1번) 배열을 반환하기 떄문에 효율적으로 렌더링 하기 위해서
* 2번) 리덕스에서 액션이 처리될 때마다 이 filter 메서드가 호출 된다는 단점이 있음,  
friends와 ageLimit이 변경되지 않아도 다른 액션이 처리가 되어도 이 filter 연산이 항상 발생하게 됨,  
렌더링이 되지 않더라도 그 연산은 수행하게 되는 단점
* useSelector 훅은 액션이 처리될때마다 선택자 함수가 실행이 된다,   
모든 연산을 끝내고 이 선택자 함수가 반환한 이 값을 기준으로,  
컴포넌트를 렌더링 할지 말지 결정하게 된다

```
// selector.js
import { createSelector } from 'reselect';

const getFriends = state => state.friend.friends;
export const getAgeLimit = state => state.friend.ageLimit;
export const getShowLimit = state => state.friend.showLimit;

export const getFriendsWithAgeLimit = createSelector(
  [getFriends, getAgeLimit],
  (friends, ageLimit) => friends.filter(item => item.age <= ageLimit),
);
export const getFriendsWithAgeShowLimit = createSelector(
  [getFriendsWithAgeLimit, getShowLimit],
  (friendsWithAgeLimit, showLimit) => friendsWithAgeLimit.slice(0, showLimit),
);
```
* reselect 라이브러리를 사용하면 이러한 연산을 효율적으로 처리할 수 있다,  
메모이제이션 기능 지원
* reselect 라이브러리는 선택자 함수를 컴포넌트 코드에서 분리해주는 장점이 있음
* createSelector 함수를 이용해서 선택자 함수를 만들면 메모이제이션 기능이 동작을 한다
* friends와 ageLimit 값이 변경되지 않았다면 이전 반환된 값을 그대로 사용
* 데이터를 가공하는 연산이 컴포넌트 코드에 없고 selector.js 파일로 분리

### 몇 가지 리덕스 사용 팁

### redux-saga를 이용한 비동기 액션 처리1
**리덕스에서 비동기 처리하기**
* redux-thunk
-비동기 로직이 간단할 때 사용  
-가장 간단하게 시작할 수 있다
* redux-observable
-비동기 코드가 많을 때 사용  
-RxJS 패키지를 기반으로 만들어졌다
* redux-saga
-비동기 코드가 많을 때 사용  
-제너레이터를 적극적으로 활용한다  
-테스트 코드 작성  이 쉽다

**좋아요 기능 추가**
```
// 1번
export const actions = {
  requestLike: timeline => ({
    type: types.REQUEST_LIKE,
    timeline
  }),
  addLike: (timelineId, value) => ({
    type: types.ADD_LIKE,
    timelineId,
    value
  }),
  setLoading: isLoading => ({
    type: types.SET_LOADING,
    isLoading,
  }),
};

// 2번
export default function* () {
  yield all([takeLeading(types.REQUEST_LIKE, fetchData)]);
}

// 3번
export default* fetchData(action) {
  yield put(actions.setLoading(true)); // 로딩을 true로 변경
  yield put(actions.addLike(action.timeline.id, 1)); // 4번 
  yield call(callApiLike); // api 호출
  yield put(actions.setLoading(false)); // 로딩을 false로 변경
}
```
* 기능 추가
-좋아요 버튼을 누르면 비동기 처리를 하고  
-비동기 처리 중에는 로딩 중을 보여주고   
-비동기 처리가 끝나면 좋아요 숫자가 올라감
* 1번) 3가지 액션을 추가
-requestLike는 어떤 타임라인에 like를 request 하는지 나타냄(saga쪽에서만 사용)
-addLike는 value 만큼 like 카운트 증가
-setLoading은 isLoading으로 로딩 상태인지를 표현
* 2번) all과 takeLeading은 사가에서 제공하는 함수
-all 안에 배열, 배열 안에서 운하는 것들을 여러개 나열
-takeLeading의 첫번쨰 매개변수로 액션을 추가,  
이 액션이 발생했을 때 두번째 있는 함수를 실행
-takeLeading effect가 아직 처리되고 있는 액션이 있을 때,  
그 사이에 들어온 액션을 무시가 된다  
그 처음에 들어온 액션에 우선순위를 높게 줘서 처리를 한다
-takeLatest는 뒤에 들어온 것에 우선순위를 더 높게 해준다
* 3번) put, call, all 모두 사가에서 부수효과라고 불리움
-put은 리덕스 액션을 발생시키는 것   
-call effect는 뒤에 있는 함수를 실행
* 4번) api를 호출하기 전에 positive 방식으로 like 카운트를 하나 증가
(API 성공했다고 가정하고 미리 반영하는 방식)

***redux-saga***
* redux-saga의 부수효과 함수는 해야 할 일을 설명하는 자바스크립트 객체를 반환한다
* 반환된 객체는 yield를 호출했을 때 사가 미들웨어에게 전달이 된다
* 리덕스의 미들웨어 쪽에서 사가 미들웨어가 돌아가고 있 다
* 사가 미들웨어는 부수효과 객체가 설명하는 일을 한 다음에 그 결과와 함께 실행 흐름을 다시 제너레이터 쪽으로 넘겨준다
### 제너레이터 이해하기
```
function* f1() { // 제너레이터 함수
  console.log('f1-1');
  yield 10;
  console.log('f1-2');
  yield 20;
  console.log('f1-3');
  yield 'finished';
}
const gen = f1(); // 제너레이터 객체가 반환
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
// f1-1
// {value: 10, done: false}
// f1-2
// {value: 20, done: false}
// f1-3
//  {value: 'finished', done: false}
console.log(gen[Symbol.iterator]() === gen);
// true
```
* 다음 조건을 만족하는 객체는 반복자(iterator)이다
-next 메서드를 갖고 있다  
-next 메서드는 value와 done 속성값을 가진 객체를 반환한다  
-done 속성값은 작업이 끝났을 때 참이 된다

* 다음 조건을 만족하면 반복 가능(iterable)한 객체다
-Symbol.iterator 속성값으로 함수를 갖고 있다  
-해당 함수를 호출하면 반복자(iterator)를 반복한다

* 제너레이터 객체는 iterator 이면서 iterable 이다
* 배열도 iterable 이다
* iterable을 만족하면 자바스크립트의 몇가지 기능을 사용할 수 있다
-for of 함수
-spread operator 전개 연산자
* 제너레이터는 실행을 멈출 수 있다,  
실행을 멈추고 실행 권한을 외부로 다시 준다,
외부에서 어떤 신호과 왔을 때 다시 실행을 제기할 수도 있다 
* 실행을 멈추고 재개할 수 있다는 특성 때문에 제너레이터는 협업이 가능합니다
* next의 인수로 입력한 값은 yield의 반환값이 된다

```
// 우리가 작성한 사가함수
function* minsu() {
  const myMsgList = [
    '안녕 나는 민수야',
    '만나서 반가워',
    '내일 영화 볼래?',
    '시간 안 되니?',
    '내일모레는 어때?',
  ];
  for(const msg of myMsgList) {
    console.log('수지', yield msg);
  }
}
// 사가 미들웨어
function suji() {
  const myMsgList = ['', '안녕 나는 수지야', '그래 반가워', '...'];
  const gen = minsu();
  for(const msg of myMsgList) {
    console.log('민수: ', gen.next(msg).value);
  }
}
```
![Alt text](https://i.stack.imgur.com/HrMk4.jpg)

### redux-saga를 이용한 비동기 액션 처리2
```
function* loginFlow() {
  while(true) {
    const { id, password } = yield take(types.LOGIN); // 1번
    const userInfo = yield call(callApiLogin, id, password);
    yield put(types.SET_USER_INFO, userInfo);
    yield take(types.LOGOUT);
    yield call(callApiLogout, id);
    yield put(types.SET_USER_INFO, null);
  }
}

// 2번
export function* fetchData(action) {
  yield put(actions.setLoading(true));
  yield put(actions.addLike(action.timeline.id, 1));
  yield put(actions.setValue('error', ''));
  try {
    yield call(callApiLike);
  } catch(error) {
    yield put(actions.setValue('error', error));
    yield put(actions.addLike(action.timeline.id, -1));
  }
  yield put(actions.setLoading(false));
}

// 3번
export default function* () {
  yield all([
    takeLeading(types.REQUEST_LIKE, fetchData),
    debounce(500, types.TRY_SET_TEXT, trySetText),
  ]);
}
```
* 1번)  take라는 effect는 매개변수로 입력한 액션을 기다립니다, 로그인 액션이 발생하면 액션 객체가 반환이 된다
* 2번) 예외처리
* 3번) debounce 기능, 짧은 시간에 같은 이벤트가 반복해서 발생할 때  
모든 이벤트를 처리하기 부담스러울 수 있는데 이때 디바운스를 사용하면 좋음,  
디바운스는 같은 함수를 연속해서 호출될 때 첫번째 또는 마지막 호출만 실행하는 기능을 말한다
