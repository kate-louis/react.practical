### 리액트란 무엇인가
* 자동으로 업데이트 되는 UI
* UI = render(state)
* render 함수는 순수 함수로 작성  
순수 함수의 특징은 입력값이 같으면 출력값이 같다는 것
* state는 불변 변수로 관리
어떤 객체의 속성을 변경한다고 할 때 새로운 객체를 만들어서 값을 할당하는 것
* 가상돔(virtual dom)
가상돔은 이전 UI 상태를 메모리에 유지해서 변경된 부분만 실제 돔에 반영해주는 기술

### 리액트 개발 환경 직접 구축하기
React.useState(false)  
React 변수는 react.development.js 파일이 실행될때 전역변수로 노출, useState 함수는 컴포넌트의 상태값을 추가 할 때 사용
React.createElement()  
이 함수는 리액트 요소를 반환  
리액트에서는 UI를 표현하는 가장 작은 단위가 리액트 요소

### 바벨 사용해 보기
* 자바스크립트 코드를 변환해 주는 컴파일러
* 최신 자바스크립트 문법을 지원하지 않는 환경에서도 최신 문법 사용 가능
* 그 외에도 다양한 용도로 사용 
(코드 주석 제거 및 압축 등)
* 리액트에서는 JSX 문법을 사용하기 위해 바벨을 사용
(JSX 문법을 createElement 함수를 호출하는 코드로 변환)

```
<div className="box">
  <Title text="hello world" width={200} />
  <button onClick={() => {}}>좋아요</button>
  <a href="/home" style={{ marginTop: '10px, color: 'red }}>홈으로 이동</a>
</div>
```

바벨은 프리셋과 플러그인이라는 개념이 있음
플러그인은 하나의 변환하는 기능을 의미
그런 여러 개의 플러그인을 모아 놓은 것이 프리셋

npx 명령어를 사용하게 되면 .bin 폴더에 있는 이 바벨 바이너리를 실행을 해줌

### 웹팩 사용해 보기
* 다양한 기능 제공
-파일 내용을 기반으로 파일 이름에 해시값 추가 (효율적인 브라우저 캐시 이용)
-사용되지 않은 코드 제거
-자바스크립트 압축
-JS에서 CSS, JSON, 텍스트 파일 등을 일반 모듈처럼 불러오기
-환경 변수 주입
* 웹팩을 사용하는 가장 큰 이유는
모듈 시스템(ESM, commonJS)을 사용하고 싶어서
ESM은 ES6에 추가, commonJS는 노드에서 많이 사용하는 시스템

```
// file1.js
export default function func1() {}
export function func2() {}
export const variable1 = 123;
export let variable2 = 'hello';

// file2.js
import myFunc1, { func2, variable1, variable2 } from './file1.js';

// file3.js
import { func2 as myFunc2 } from './file1.js'; 
```

### create-react-app으로 시작하기
```
$ npx create-react-app cra-test
$ npm start
```
cra vs next.js 차이는 서버사이드 렌더링의 지원 여부 

```
import data './data.json';
// 동적으로 데이터를 받아오기
import('./data.json').then(({default: data}) => {
  console.log({ data });
});
```

### create-react-app으로 시작하기2
```
$ npm start // 개발모드로 실행
$ HTTPS=true npm start // https로 실행
$ npm build // 배포할 때 사용, 정적파일이 생성됨
$ npx serve -s build // 로컬에서 정적 파일을 서비스
$ npm test // 테스트 명령어
$ npm eject // react-scripts를 사용하지 않고 모든 설정 파일을 추출하는 명령어
```
작은 사이즈의 이미지는 별도 파일 생성이 아니라 자바스크립트 파일 안애 내장이 된다. 이유는 HTTP 요청 횟수를 줄이고 좀더 빠르게 이미지를 보여주기 위해서

보통 polyfill을 추가할 떄는 core-js 라는 것을 많이 사용함. 바벨도 core-js를 사용함
CRA에는 기본적으로 core-js가 내장되어 있음

```
process.env.{변수 이름}
process.env.NODE_ENV
// npm start로 실행하면 development
// npm run build로 실행하면 production

// terminal
$ REACT_APP_API_URL=api.myapp.com npm start
```
환경변수는 개발, 테스트 또는 배포 환경별로 다른 값을 적용할 때 유용, 전달된 환경변수는 코드에서 process.env.{변수 이름} 이런 식으로 사용
환경변수가 많아지면 .env 파일로 관리하는게 좋음 (.env.development, .env.production)

### CSS 작성 방법 결정하기
* 일반적인 CSS 파일로 작성하기
* css-module로 작성하기
classnames 패키지 편리
* Sass로 작성하기
cra에서 sass를 사용하려면 node-sass 패키지 필요
sass와 css-module을 같이 사용할 수 있음
* css-in-js로 작성하기 (최근에 많이 사용)
css 코드를 자바스크립트 파일 안에서 작성하는 방식
styled-components 패키지

### 단일 페이지 애플리케이션(SPA) 만들기
멀티페이지 애플리케이션 MPA (전통적인 방식) vs 단일 페이지 애플리케이션 SPA

* SPA가 가능하기 위한 조건
-자바스크립트에서 브라우저로 페이지 전환 요청을 보낼 수 있다. 단, 브라우저는 서버로 요청 X
-브라우저의 뒤로 가기 같은 사용자의 페이지 전환 요청을 자바스크립트에서 처리할 수 있다. 단, 브라우저는 서버로 요청 X
* 위 조건을 만족시켜주는 브라우저 API
-pushState, replaceState 함수
-popstate 이벤트

react-router-dom 패키지
편의 기능, 코드 스플리팅(분할) 기능 제공
```
import { BrowserRouter, Route, Link } from 'react-router-dom';

<BrowserRouter>
  <Link to="/">홈</Link>
  <Route exact path ="/" component={Home} />
</BrowserRouter>

export default function Romms({ match }) {}
```
BrowserRouter 컴포넌트에서 현재 페이지의 상태값을 관리해준다
Link 컴포넌트는 클릭했을 때 to 에 해당하는 경로로 이동 시켜준다
Route 컴포넌트를 사용하면 path 정보에 따라서 어떤 컴포넌트를 렌더링 할지 결정해준다
Route 컴포넌트로 렌더링을 하면 해당 컴포넌트의 속성값으로 match라는 속성값을 넣어준다.



