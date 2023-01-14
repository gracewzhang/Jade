import React from 'react';
import styled from 'styled-components';

import Gallery from './Gallery';
import Header from './Header';
import Settings from './Settings';
import Statistics from './Statistics';

const ProfileContainer = styled.div`
  display: grid;
  grid-template-rows: 13vh 71vh;
  padding: 7vh 7vw 9vh 7vw;
  height: calc(100% - 7vh - 9vh);
`;

const ContentContainer = styled.span`
  display: grid;
  grid-template-columns: 45% 55%;
`;

const LeftContentContainer = styled.div`
  display: grid;
  grid-template-rows: 36vh 35vh;
  padding-right: 5vw;
`;

const StatisticsContainer = styled.div`
  padding-bottom: 8vh;
`;

const SettingsContainer = styled.div``; // TODO: necessary?

const GalleryContainer = styled.div``;

const Profile = (): React.ReactElement => {
  return (
    <ProfileContainer>
      <Header />
      <ContentContainer>
        <LeftContentContainer>
          <StatisticsContainer>
            <Statistics />
          </StatisticsContainer>
          <SettingsContainer>
            <Settings />
          </SettingsContainer>
        </LeftContentContainer>
        <GalleryContainer>
          <Gallery />
        </GalleryContainer>
      </ContentContainer>
    </ProfileContainer>
  );
};

export default Profile;
