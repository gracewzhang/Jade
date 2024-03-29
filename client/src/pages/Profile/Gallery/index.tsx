import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';

import Block from '../../../components/Block';
import useStore from '../../../stores';
import { PhotoProps } from './types';
import ScrollContainer from '../../../components/ScrollContainer';
import { usePhotos } from '../../../hooks/photos/usePhotos';

const GalleryContainer = styled(Block)`
  overflow: hidden;
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid: repeat(5, 20%) / repeat(5, 1fr);
  align-content: start;
  gap: 0.5em;
  grid-auto-rows: 20%;
  grid-auto-columns: 20%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Photo = (props: PhotoProps): React.ReactElement => {
  const { url } = props;

  return <StyledImg src={url} />;
};

const Gallery = (): React.ReactElement => {
  const user = useStore((state) => state.user);
  const { getPhotos } = usePhotos();

  const { isLoading, isError, data, error } = useQuery<string[], Error>(
    ['get-user-photos', user?.google_id],
    async () => await getPhotos({ googleId: user?.google_id })
  );

  if (isLoading) {
    return <Skeleton count={31} />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <GalleryContainer>
      <ScrollContainer scroll={data !== undefined && data.length > 20}>
        <GridContainer>
          {data?.map((url, key) => (
            <Photo url={url} key={key} />
          ))}
        </GridContainer>
      </ScrollContainer>
    </GalleryContainer>
  );
};

export default Gallery;
