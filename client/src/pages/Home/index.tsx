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

const ContentContainer = styled.span`
  display: grid;
  grid-template-columns: 60% 40%;
`;

const LeftContentContainer = styled.div`
  display: grid;
  grid-template-rows: 40% 60%;
`;

const BottomContentContainer = styled.span`
  display: grid;
  grid-template-columns: 60% 40%;
`;

const RightContentContainer = styled.div`
  display: grid;
  grid-template-rows: 70% 30%;
`;

const Home = (): React.ReactElement => {
  // TODO: const [user, setUser] = useLocalStorage("user", null);
  const { user } = useAuthContext();
  return (
    <HomeContainer>
      <Welcome/>
      <ContentContainer>
        <LeftContentContainer>
          <p>hello</p>
          <BottomContentContainer>
            <p>hello 2</p>
            <p>hello 3</p>
          </BottomContentContainer>
        </LeftContentContainer>
        <RightContentContainer>
          <p>fdjls</p>
          <p>fjdks;lafjdlks;</p>
        </RightContentContainer>
      </ContentContainer>
    </HomeContainer>
  );
};

export default Home;
