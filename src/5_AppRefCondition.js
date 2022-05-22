import React, { useState, useRef } from 'react';

export default function App() {
  const inputRef = useRef();
  const [showText, setShowText] = useState(true);
  console.log('render');

  return (
    <div>
      {showText && <input type="text" ref={inputRef} />}
      <button onClick={() => setShowText(!showText)}>텍스트 보이기/가리기</button>
      <button onClick={() => inputRef.current && inputRef.current.focus()}>
        텍스트로 이동
      </button>
    </div>
  );
}
