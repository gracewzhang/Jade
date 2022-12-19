import React from 'react';
import styled from 'styled-components';

import { useAuthContext } from '../../contexts/AuthContext';
import colors from '../../styles/colors';

const HomeContainer = styled.div`
  // background-color: ${colors['light-grey']}
`;

const Home = (): React.ReactElement => {
  // TODO: const [user, setUser] = useLocalStorage("user", null);
  const { user } = useAuthContext();
  return (
    <HomeContainer>
      <p>{user?.name}</p>
    </HomeContainer>
  );
};

export default Home;
