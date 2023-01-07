import React from 'react';
import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Gallery from './Gallery';
import Header from './Header';
import Settings from './Settings';
import Statistics from './Statistics';
import colors from '../../utils/colors';

const ProfileContainer = styled.div`
  display: grid;
  grid-template-rows: 13vh 71vh;
  padding: 7vh 7vw 9vh 7vw;
  height: 84vh;
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

const SettingsContainer = styled.div``;

const GalleryContainer = styled.div``;

const Profile = (): React.ReactElement => {
  const loading = false; // TODO

  return (
    <SkeletonTheme baseColor={colors['super-light-grey']} borderRadius="30px">
      <ProfileContainer>
        <Header />
        <ContentContainer>
          <LeftContentContainer>
            <StatisticsContainer>
              {loading ? <Skeleton count={13} /> : <Statistics />}
            </StatisticsContainer>
            <SettingsContainer>
              {loading ? <Skeleton count={15} /> : <Settings />}
            </SettingsContainer>
          </LeftContentContainer>
          <GalleryContainer>
            {loading ? <Skeleton count={31} /> : <Gallery />}
          </GalleryContainer>
        </ContentContainer>
      </ProfileContainer>
    </SkeletonTheme>
  );
};

export default Profile;
