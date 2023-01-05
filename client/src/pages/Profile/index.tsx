import React from 'react';
import styled from 'styled-components';
import Gallery from './Gallery';
import Header from './Header';
import Settings from './Settings';
import Statistics from './Statistics';

const ProfileContainer = styled.div`
  display: grid;
  grid-template-rows: 20% 80%;
  padding: 7vh 7vw 9vh 7vw;
  height: 84vh;
`;

const BottomContainer = styled.span`
  display: grid;
  grid-template-columns: 40% 50%;
`;

const LeftContentContainer = styled.div`
  display: grid;
  grid-template-rows: 40% 50%;
`;

const StatisticsContainer = styled.div``;

const SettingsContainer = styled.div``;

const GalleryContainer = styled.div``;

// TODO: loading skeleton
const Profile = (): React.ReactElement => {
  return (
    <ProfileContainer>
      <Header />
      <BottomContainer>
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
      </BottomContainer>
    </ProfileContainer>
  );
};

export default Profile;
