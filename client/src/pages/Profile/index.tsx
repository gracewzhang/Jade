import React from 'react';
import styled from 'styled-components';

import Gallery from './Gallery';
import Header from './Header';
import Settings from './Settings';
import Statistics from './Statistics';

const ProfileContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 5.5fr;
  padding: 7vh 7vw 9vh 7vw;
  height: calc(100% - 7vh - 9vh);
`;

const ContentContainer = styled.span`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 5vw;
`;

const LeftContentContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 8vh;
`;

const Profile = (): React.ReactElement => {
  return (
    <ProfileContainer>
      <Header />
      <ContentContainer>
        <LeftContentContainer>
          <Statistics />
          <Settings />
        </LeftContentContainer>
        <Gallery />
      </ContentContainer>
    </ProfileContainer>
  );
};

export default Profile;
