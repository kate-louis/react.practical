import React, { useRef, useEffect } from 'react';

export default function App() {
  const inputRef = useRef();
  const buttonRef = useRef();
  useEffect(() => {
    //inputRef.current.focus();
    buttonRef.current.focus();
  }, []);

  const Button = React.forwardRef(function({onClick}, ref) {
    return (
      <button onClick={onClick} ref={ref}>텍스트로 이동</button>
    );
  });

  return (
    <div>
      <InputAndSave inputRef={inputRef} />
      <Button ref={buttonRef} onClick={() => inputRef.current.focus()} />
    </div>
  );

  function InputAndSave({ inputRef }) {
    return (
      <div>
        <input type="text" ref={inputRef} />
        <button>SAVE</button>
      </div>
    );
  }
}
