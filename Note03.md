# 2048 게임 만들기
* 소스 코드  
https://github.com/landvibe/inflearn-react-project
* play2048.co
* lodash는 함수형 프로그래밍으로 작성할 때 많이 사용, 여러가지 기능을 활용하기 좋음
* hotkeys-js 라이브러리 사용
* classnames 패키지 사용

```
// jsconfig.json 
// vscode에서 타입체크, auto import

{
  "compilerOptions": {
    "jsx": "react",
    "module": "commonjs",
    "target": "es6",
    "checkJs": true
  },
  "exclude": ["node_modules"]
}
```

```
// src/util/tile.js

tileList.some(item => item.x === tile.x && item.y === tile.y);
// some은 아이템 중에 하나라도 만족하는게 있으면 true를 반환

while(!title || (tileList && checkCollision(tileList, tile))) { ... }
// 현재 들고 있는 tile들과 위치가 충돌되면 안되니까 검사 필요
// 만족할 때까지 loop를 돌면서 타일을 만들어서 검사, 만족못하면 계속 타일을 만듦
// tileList를 입력 안하는 케이스도 있음
```

```
// src/util/keyboard.js
// 옵저버 패턴으로 키보드 이벤트 핸들러 부분 구현

import hotkeys from 'hotkeys-js';

const observerMap = {};
export function addKeyObserver(key, callback) {
  if(!observerMap[key]) {
    observerMap[key] = [];
    hotkeys(key, () => executeCallbacks(key));
  }
  observerMap[key].push(callback);
}

export function removeKeyObserver(key, callback) {
  observerMap[key] = observerMap[key].filter(item => item !== callback);
}

function executeCallbacks(key) {
  for(const ob of observerMap[key]) {
    ob();
  }
}
```

```
// src/util/tile.js

export function moveTile({ tileList, x, y}) {
  ...
  return newTileList;
}
// tileList를 받아서 x, y 움직이는 방향 정보를 받아서 움직인 다음에 마지막에는 newTileList를 반환하는 함수
```

```
// src/hook/useMoveTile.js

export function useMoveTile({ tileList, setTileList, setScore }) {
  function moveAndAdd({ x, y }) {
    const newTileList = moveTile({ tileList, x, y });
    const score = newTileList.reduce((acc, item) => (item.isMerged ? acc + item.value: acc), 0);
    setScore(v => v + score);
    ...
  }
}
// score는 머지된 value 만큼 score를 추가 
```

```
// src/hook/useLocalStorage.js
// best score는 새로고침 해도 살아 있음, 로컬스토리지에 저장

export default function useLocalStorageNumber(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  ...
  useEffect(() => {
    const prev = window.localStorage.getItem(key);
    const next = String(value);
    if(prev !== next) {
      window.localStorage.setItem(key, next);
    }
  }, [key, value]);
  return [value, setValue];
}
```
