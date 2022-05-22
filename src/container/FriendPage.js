import React, { useState } from 'react';
import { getNextFriend } from '../data';
import FriendList from '../component/FriendList';
import NumberSelect from '../component/NumberSelect';

export default function FriendPage() {
  const [friends, setFriends] = useState([]);
  const [ageLimit, setAgeLimit] = useState(MAX_AGE_LIMIT);
  const [nameLenLimit, setNameLen] = useState(MAX_NAME_LEN_LIMIT);

  const friendsWithAgeLimit = friends.filter(item => item.age <= ageLimit);
  const friendsWithNameLenLimit = friends.filter(item => item.name.length <= nameLenLimit);

  function onAdd() {
    const friend = getNextFriend();
    setFriends([...friends, friend]);
  }

  return (
    <div>
      <button onClick={onAdd}>친구 추가</button>

      <NumberSelect value={ageLimit} options={AGE_LIMIT_OPTIONS} label='세 이하만 보기' onChange={setAgeLimit} />
      <FriendList friends={friendsWithAgeLimit} />

      <NumberSelect value={nameLenLimit} options={NAME_LEN_LIMIT_OPTIONS} label='자 이하 이름만 보기' onChange={setNameLen} />
      <FriendList friends={friendsWithNameLenLimit} />
    </div>
  );
} 

const MAX_AGE_LIMIT = 100;
const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT];
const MAX_NAME_LEN_LIMIT = 10;
const NAME_LEN_LIMIT_OPTIONS = [2, MAX_NAME_LEN_LIMIT];
