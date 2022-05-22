import React, { useState, useCallback } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [v1, setV1] = useState(0);
  const onSave = useCallback(() => saveToServer(name, age), [name, age]);
  return (
    <div>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
      <UserEdit
        onSave={onSave}
        setName={setName}
        setAge={setAge}
      />
      <p>{`v1: ${v1}`}</p>
      <button onClick={() => setV1(Math.random())}>v1 수정</button>
    </div>
  );
}

const UserEdit = React.memo(function({ onSave, setName, setAge }) {
  console.log('UserEdit render');
  return null;
});

function saveToServer(name, age) {}
