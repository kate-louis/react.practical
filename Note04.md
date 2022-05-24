### 콘텍스트 API로 데이터 전달하기
```
import React, { createContext } from 'react';

const UserContext = createContext('unknown'); // 1번

export default function App() {
  return (
    <div>
      <UserContext.Provider value="mike"> // 2번
      ...
      </UserContext.Provider>
    </div>
  );
}

function Profile() { ... } // 5번

function Greeting() {
  return ( 
    <UserContext.Consumer> // 4번
      {username => <p>{`${username}님 안녕하세요`}</p>} // 3번
    </UserContext.Consumer>
  );
}

function Greeting() {
  const username = useContext(UserContext); // 6번
  return (
    <p>{`${username}님 안녕하세요`}</p>
  );
}
```
* 1번) 객체 반환, 그 객체 안에는 Provider와 Consumer 컴포넌트가 들어있음
* 2번) Provider에서 value에 값을 넣어 주면 Consumer에서 그 값을 받아서 처리를 할 수 있음
* 3번) render props라는 패턴으로 작성한 코드, children을 함수 형태로 작성
* 4번) Consumer가 사용됐을 때 필요한 값을 찾기 위해서 부모로 올라가면서 가장 가까운 Provider를 찾는다
* 5번) Provider 컴포넌트의 이 값이 변경되면 하위의 모든 Consumer 컴포넌트는 다시 렌더링 된다 (중간에 위치한 컴포넌트가 렌더링 되지 않아도)
* 6번) useContext 훅을 사용하는 것이 훨씬 좋음
  
*****

* 데이터의 종류별로 Context를 나누면 렌더링 성능상 이점이 있음
* 하위 컴포넌트에서 데이터를 수정하고 싶을 때는 데이터를 수정할 수 있는 함수를 별도의 Context로 분리해주는 방법
* Context를 사용할 때 주의할 점  
-value에 객체를 직접 입력하면 이 컴포넌트가 렌더링될 때마다 매번 새로운 객체가 만들어진다,    
내부 값이 변경되지 않아도 Consumer는 매번 불필요하게 렌더링이 된다  
-Consumer를 사용하는 쪽에서는 항상 Provider 컴포넌트 안에 렌더링 되도록 작성,  
대부분 Context Provider 컴포넌트를 루트에서 jsx부분 전체를 감싸는 방식으로 작성함

### ref 속성값으로 자식 요소에 접근하기
```
import React, { useRef, useEffect } from 'react';

export default function App() {
  const inputRef = useRef();
  useEffect(() => { // 2번
    inputRef.current.focus(); // 1번
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
}

// 3번
const Button = React.forwardRef(function({ onClick }, ref) { ... }); 

// 4번
<input type="text" 
  ref={ ref => ref && setText(INITIAL_TEXT) }
  value={text}
/>

const setInitialText = useCallback(ref => ref && setText(INITIAL_TEXT), []);
<input ref={setInitialText} />

// 5번
const boxListRef = useRef({}); // 빈 객체를 초기값으로 입력
function onClick() {
  for(const box of BOX_LIST) {
    const ref = boxListRef.current[box.id];
  }
}
{BOX_LIST.map(item => (
  <div
    key={item.id}
    ref={ref => (boxListRef.current[item.id] = ref)}
  >{`box_${item.id}`}</div>
))}

```
* 실제 돔 요소에 직접 접근해야 할 때   
(돔 요소에 포커스, 돔요소의 크기나 스크롤 위치가 알고 싶은 경우) ref 속성값을 이용하면 자식 요소에 직접 접근할 수 있다,   
자식요소는 컴포넌트 일 수도 있고 돔 요소일 수도 있다
* 1번) current라는 속성은 실제 돔을 가르키게 됨
* 2번) useEffect 내부에서 실행, 실제 돔 요소는 렌더링 결과가 실제 돔에 반영된 후에 접근할 수 있기 때문에 부수효과 함수 안에서 접근을 할 수 있다
* ref 속성값은 일반적인 컴포넌트에도 입력할 수 있는데, 만약에 이 컴포넌트가 클래스형 컴포넌트라면 해당 컴포넌트의 인스턴스를 가르키고 current 속성은 해당 클래스의 메서드를 호출할 수 있음,  
함수형 컴포넌트는 useImperativeHandle 이라는 훅을 이용하면 됨
* 3번) forwardRef 함수를 사용하면 두번째 매개변수로 ref 속성값을 받을 수 있다
* 4번) ref 속성값에 함수를 입력하는 코드   
-이 함수는 해당하는 요소가 생성되거나 사라질 때 한 번씩 호출된다,   
생성될 때는 해당 요소의 레퍼런스가 넘어오고 사라질 때는 null 값이 넘어온다   
-컴포넌트가 렌더링될 때마다 새로운 함수를, 새로운 ref 함수를 입력하고 있기 때문에 제대로 동작하지 않는다,    
ref 속성값으로 새로운 함수가 들어오면 이전 함수에 null 인수를 넣어서 호출하고 새로운 함수에는 요소의 참조값을 넣어서 다시 호출,   
문자를 입력할 때 계속 컴포넌트가 렌더링 되고 그때마다 새로운 함수가 입력되고 INITIAL_TEXT 계속 입력됨  
-함수를 고정하기 위해 useCallback 훅을 사용,  
useCallback 훅의 메모이제이션 기능 덕분에 한번 생성된 이 함수를 계속 재사용함, 이 함수는 변하지 않는 값이 됨   
* 5번) 접근하고자 하는 돔 요소의 개수가 많을 때 함수를 입력하는 방법을 사용할 수 있음,   
사실 ref객체에는 원하는 값이면 어떤 값이든 저장 가능

### 리액트 내장 훅 살펴보기
```
// 1번
const value = useMemo(() => runExpensiveJob(v1, v2), [v1, v2]);

// 2번
<UserEdit onSave={() => saveToServer(name, age)}>

// 3번
const onSave = useCallback(() => saveToServer(name, age), [name, age]);
<UserEdit onSave={onSave} />

// 4번
useImperativeHandle(ref, () => ({
  addAge: () => {},
  getNameLength: () => {},
}));
```
* useState
* useEffect
* useContext
* useRef  
-렌더링과 상관없는 값을 저장할 때 유용하게 사용  
-이전 상태값을 기억하고 싶을 때 사용
* useMemo   
-메모이제이션 기능 제공, 이전값 재활용  
-계산량이 많은 함수의 반환값을 재활용하는 용도로 사용  
-1번) 첫번째 매개변수 함수가 실행된 결과값을 리액트가 기억하고,  
뒤에 입력한 배열에 있는 값이 하나라도 변경되면 해당 함수가 실행됨,   
만약 이 값이 변경되지 않았다면 이전에 실행해서 저장했던 값을 재활용
* useCallback   
-메모이제이션 기능 제공  
-함수 메모이제이션에 특화된 훅  
-2번) 함수를 입력해서 속성값을 전달할 때는 이 컴포넌트가 렌더링될 때마다 새로운 함수가 생성되어 입력이 된다,  
이 컴포넌트가 렌더링될 때마다 매번 이 속성값이 변경되기 때문에 자식 컴포넌트가 불필요하게 렌더링이 발생   
-3번) useCallback을 사용하여 문제 해결
* useReducer   
-여러 개의 상태값을 하나의 훅으로 관리할 때 사용    
-reducer함수를 이용하면 상태값을 변경하는 로직을 분리할 수 있는 장점    
-useReducer 훅이랑 Context api를 같이 이용하면 상위 컴포넌트에서 트리의 깊은 곳으로 이벤트 처리 함수를 쉽게 전달할 수 있다
* useImperativeHandle   
-useImperativeHandle 훅을 이용하면 마치 함수형 컴포넌트에도 멤버 변수나 멤버 함수가 있는 것처럼 만들 수 있다   
-4번) 두번째 매개변수로 함수를 입력하고, 이 함수가 반환한 값이 이 부모의 ref객체가 참조하는 값이다,    
부모 컴포넌트에서 자식 컴포넌트가 제공해준 함수를 호출할 수가 있다
* useLayoutEffect  
-useEffect 훅에 입력된 부수효과 함수는 렌더링 결과가 돔에 반영된 후에 비동기로 호출   
-useLayoutEffect 훅은 useEffect 훅과 거의 비슷학 동작하지만 부수효가 함수를 동기로 호출한다는 점이 다름,  
렌더링 결과가 돔에 반영된 직후에 바로 호출됨   
-부수효과 함수에서 연산을 많이 하면 브라우저가 먹통이 될 수도 있음    
-렌더링 직후에 돔 요소의 값을 읽어들이는 경우 또는 조건에 따라서 컴포넌트를 다시 렌더링 하고 싶은 경우 사용     
-리액트가 렌더링을 하고 실제 돔에 반영은 했지만 브라우저가 화면을 그리기 전에 이 코드가 실행됨, 동기로 실행됨
* useDebugValue   
-커스텀 훅 안에서 useDebugValue를 사용하면 리액트 개발자 도구에 좀 더 풍부한 정보를 제공해줄 수 있음
