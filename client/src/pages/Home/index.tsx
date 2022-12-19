import React from 'react';
import styled from 'styled-components';

import Welcome from './Welcome';
import { useAuthContext } from '../../contexts/AuthContext';
import colors from '../../styles/colors';

const HomeContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  padding: 5%;
`;

const Home = (): React.ReactElement => {
  // TODO: const [user, setUser] = useLocalStorage("user", null);
  const { user } = useAuthContext();
  return (
    <HomeContainer>
      <Welcome/>
      <p>yo</p>
    </HomeContainer>
  );
};

export default Home;
