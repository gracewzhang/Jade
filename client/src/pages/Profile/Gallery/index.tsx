import React, { useState, useEffect, useRef } from 'react';
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
  const urls = useRef<string[]>([]);
  const [rerender, setRerender] = useState(true);

  const retrievePhotos = async (): Promise<void> => {
    if (user !== undefined) {
      const storageRef = ref(storage, `/${FIREBASE_ROOT}/${user.google_id}`);
      await listAll(storageRef)
        .then(async (res) => {
          for (const itemRef of res.items) {
            await getDownloadURL(itemRef).then((url) => urls.current.push(url));
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setRerender(!rerender);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    retrievePhotos();
  }, []);

  return (
    <GalleryContainer>
      {urls.current.map((url, key) => (
        <Photo url={url} key={key} />
      ))}
    </GalleryContainer>
  );
};

export default Gallery;
