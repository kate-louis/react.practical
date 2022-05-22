import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext('unknown');

export default function App() {
  const [name, setName] = useState('kate');
  console.log('app');
  return (
    <div>
      <UserContext.Provider value={name}>
        Hello!
        <Profile />
        <div>
          <input type="text" value={name} onChange={e => setName(e.target.value) }/>
        </div>
      </UserContext.Provider>
    </div>
  );
}

const Profile = React.memo(function() {
  console.log('profile');
  return (
    <div>
      <Greeting />
    </div>
  );
});

function Greeting() {
  console.log('greeting');
  const username = useContext(UserContext);
  return (
    <p>{`${username}님 안녕하세요`}</p>
  );
  // return (
  //   <UserContext.Consumer>
  //     {username => <p>{`${username}님 안녕하세요`}</p>}
  //   </UserContext.Consumer>
  // );
}

// No Context
// export default function App() {
//   return (
//     <div>
//       Hello!
//       <Profile username={'kate'} />
//     </div>
//   );
// }
//
// function Profile({username}) {
//   console.log('profile');
//   return (
//     <div>
//       <Greeting username={username} />
//     </div>
//   );
// }
//
// function Greeting({username}) {
//   console.log('greeting');
//   return (
//     <p>
//       {`${username}님 안녕하세요`}
//     </p>
//   );
// }
