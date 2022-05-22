import React, { useState, useEffect } from 'react';

function Profile({ userId }) {
  
  // const user = useUser(userId);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserApi(userId).then(data => setUser(data));
  }, [userId]);

  // const width = useWindowWidth();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // ...
}
