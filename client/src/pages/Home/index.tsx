import React from 'react';
import styled from 'styled-components';

import Welcome from './Welcome';
import Photos from './Photos';
import Entry from './Entry';
import SongFood from './SongFood';
import Calendar from './Calendar';
import Thoughts from './Thoughts';
import { useAuthContext } from '../../contexts/AuthContext';

const HomeContainer = styled.div`
  display: grid;
  grid-template-rows: 15% 85%;
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

const BottomRightContentContainer = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
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
          <Photos/>
          <BottomContentContainer>
            <Entry/>
            <BottomRightContentContainer>
              <SongFood/>
              <SongFood/>
            </BottomRightContentContainer>
          </BottomContentContainer>
        </LeftContentContainer>
        <RightContentContainer>
          <Calendar/>
          <Thoughts/>
        </RightContentContainer>
      </ContentContainer>
    </HomeContainer>
  );
};

export default Home;
