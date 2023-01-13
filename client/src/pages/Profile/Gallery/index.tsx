import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

import Block from '../../../components/Block';
import storage from '../../../utils/firebase';
import useStore from '../../../stores';
import { PhotoProps } from './types';
import ScrollContainer from '../../../components/ScrollContainer';

// TODO: cmd shift f all of the `` to <>
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

//  TODO: onclick, open modal w/the picture on the left & a button for jumping to the respective day on the right
const Photo = (props: PhotoProps): React.ReactElement => {
  const { url } = props;

  return <StyledImg src={url} />;
};

const FIREBASE_ROOT = process.env.REACT_FIREBASE_ROOT ?? 'test';

const Gallery = (): React.ReactElement => {
  const user = useStore((state) => state.user);

  const { isLoading, isError, data, error } = useQuery<string[], Error>(
    'query-tutorials',
    async () => {
      const photoUrls: string[] = [];
      if (user !== undefined) {
        const storageRef = ref(storage, `/${FIREBASE_ROOT}/${user.google_id}`);
        await listAll(storageRef)
          .then(async (res) => {
            for (const itemRef of res.items) {
              await getDownloadURL(itemRef).then((url) => photoUrls.push(url));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return photoUrls;
    }
  );

  // TODO: skeleton
  if (isLoading) {
    return <div>LOADING</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <GalleryContainer>
      <ScrollContainer>
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
