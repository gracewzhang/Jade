import React, { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { HiOutlinePlus } from 'react-icons/hi2';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import Block from '../../../components/Block';
import colors from '../../../utils/colors';
import storage from '../../../utils/firebase';
import { useAuthContext } from '../../../contexts/auth/AuthContext';
import { PhotoProps, PhotosProps } from './types';

const PhotosContainer = styled(Block)`
  display: flex;
  flex-direction: row;

  > div + div {
    border-left: 1px dashed ${colors['light-grey']};
  }
`;

const PhotoContainer = styled.div`
  width: 12.5vw;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const StyledDropzone = styled(Dropzone)``;

const StyledDropzoneDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPlusIcon = styled(HiOutlinePlus)`
  color: ${colors.rose};
  width: 40px;
  height: 40px;
  stroke-width: 3px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Photo = (props: PhotoProps): React.ReactElement => {
  const { idx, googleId, date, photo } = props;
  const [src, setSrc] = useState(photo);
  const [progress, setProgress] = useState(0);

  // TODO: disable switching btwn days while upload is happening/test this behavior
  const handleUpload = (files: File[]): void => {
    if (googleId === undefined) return;

    const file = files[0];
    const storageRef = ref(
      storage,
      `/${googleId}/${date}-${String(idx)}.${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => console.log(error),
      () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setSrc(url);
        });
      }
    );
  };

  return (
    <PhotoContainer>
      <StyledDropzone maxFiles={1} onDrop={handleUpload}>
        {({ getRootProps, getInputProps }) =>
          src === '' ? (
            <StyledDropzoneDiv {...getRootProps()}>
              <input {...getInputProps()} />
              <StyledPlusIcon />
              <p>{progress}</p>
            </StyledDropzoneDiv>
          ) : (
            <StyledImg src={src} />
          )
        }
      </StyledDropzone>
    </PhotoContainer>
  );
};

const Photos = (props: PhotosProps): React.ReactElement => {
  const { user } = useAuthContext();
  const { date, photos } = props;

  return (
    <PhotosContainer>
      {[0, 1, 2, 3].map((e) => (
        <Photo
          key={e}
          idx={e}
          googleId={user?.google_id}
          date={date}
          photo={photos[e]}
        />
      ))}
    </PhotosContainer>
  );
};

export default Photos;
