import React from 'react';

import { useAuthContext } from '../../contexts/AuthContext';

const Home = (): React.ReactElement => {
  // TODO: const [user, setUser] = useLocalStorage("user", null);
  const { user } = useAuthContext();
  return (
    <>
      <p>{user?.name}</p>
    </>
  );
};

export default Home;
