import React, { useState } from 'react';
import { getNextFriend } from './data';

export default function App() {
  const [friends, setFriends] = useState([]);
  const [ageLimit, setAgeLimit] = useState(MAX_AGE_LIMIT);

  const friendsWithAgeLimit = friends.filter(item => item.age <= ageLimit);
  function onAdd() {
    const friend = getNextFriend();
    console.dir(friend);
    setFriends([...friends, friend]);
  }
  function onChangeOption(e) {
    const value = Number(e.currentTarget.value);
    setAgeLimit(value);
  }

  return (
    <div>
      <button onClick={onAdd}>친구 추가</button>
      <div>
        <select onChange={onChangeOption} value={ageLimit}>
          {AGE_LIMIT_OPTIONS.map(option => (
             <option key={option} value={option}>
               {option}
             </option>
          ))}
        </select>
        세 이하만 보기
      </div>
      <ul>
        {friendsWithAgeLimit.map(friend => (
          <li key={friend.id}>{`${friend.name} (${friend.age})`}</li>
        ))}
      </ul>
    </div>
  );
} 

const MAX_AGE_LIMIT = 100;
const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT];
