import React from 'react';

import { useAuthContext } from '../contexts/AuthContext';

const Home = (): React.ReactElement => {
  const { user } = useAuthContext();
  return (
    <>
      <p>{user?.name ?? 'oh'}</p>
    </>
  );
};

export default Home;
