import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

import Block from '../../../components/Block';
import storage from '../../../utils/firebase';
import useStore from '../../../stores';
import { PhotoProps } from './types';
import colors from '../../../utils/colors';

// TODO: cmd shift f all of the `` to <>
const GalleryContainer = styled(Block)`
  display: grid;
  grid: repeat(5, 20%) / repeat(5, 1fr);
  align-content: start;
  gap: 0.5em;
  overflow-y: scroll;
  grid-auto-rows: 20%;
  grid-auto-columns: 20%;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    margin-top: 8px;
    margin-bottom: 8px;
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors['light-grey']};
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.grey};
  }
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

// TODO: photo uploading is buggy
const Gallery = (): React.ReactElement => {
  const user = useStore((state) => state.user);
  const [urls, setUrls] = useState<string[]>([]);

  const retrievePhotos = async (): Promise<void> => {
    if (user !== undefined) {
      const photoUrls: string[] = [];
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
      setUrls(photoUrls);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    retrievePhotos();
  }, []);

  const loading = false; // TODO: skeleton

  return (
    <GalleryContainer>
      {urls.map((url, key) => (
        <Photo url={url} key={key} />
      ))}
      {/* {urls.length > 25 && <ViewAllButton>View All</ViewAllButton>} */}
    </GalleryContainer>
  );
};

export default Gallery;
