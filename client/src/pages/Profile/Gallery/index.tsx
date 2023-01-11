import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

import Block from '../../../components/Block';
import storage from '../../../utils/firebase';
import useStore from '../../../stores';
import { PhotoProps } from './types';

// TODO: cmd shift f all of the `` to <>
const GalleryContainer = styled(Block)``;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Photo = (props: PhotoProps): React.ReactElement => {
  const { url } = props;

  return <StyledImg src={url} />;
};

const FIREBASE_ROOT = process.env.REACT_FIREBASE_ROOT ?? 'test';

const Gallery = (): React.ReactElement => {
  const user = useStore((state) => state.user);
  const [urls, setUrls] = useState<string[]>([]);

  const retrievePhotos = (): void => {
    if (user !== undefined) {
      const storageRef = ref(storage, `/${FIREBASE_ROOT}/${user.google_id}`);
      const photosURLs: string[] = [];

      listAll(storageRef)
        .then(async (res) => {
          for (const itemRef of res.items) {
            await getDownloadURL(itemRef).then((url) => photosURLs.push(url));
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log('setting state to', photosURLs);
      setUrls(photosURLs);
    }
  };

  useEffect(() => {
    retrievePhotos();
  }, []);

  useEffect(() => {
    console.log('new urls', urls);
  }, [urls]);

  console.log('RERENDER');

  return (
    <GalleryContainer>
      {urls?.map((url, key) => (
        <>{url}</>
      ))}
    </GalleryContainer>
  );
};

export default Gallery;
