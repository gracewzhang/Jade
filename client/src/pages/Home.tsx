import React from 'react';

import { useAuthContext } from '../contexts/AuthContext';

const Home = (): React.ReactElement => {
  // TODO: const [user, setUser] = useLocalStorage("user", null);
  const { user } = useAuthContext();
  console.log(user);
  return (
    <>
      <p>{user[0]?.name ?? 'oh'}</p>
    </>
  );
};

export default Home;
