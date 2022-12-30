import React, { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { HiOutlinePlus } from 'react-icons/hi2';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import Block from '../../../components/Block';
import colors from '../../../utils/colors';
import storage from '../../../utils/firebase';

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

const Photo = (): React.ReactElement => {
  const [percent, setPercent] = useState(0);

  const handleUpload = (acceptedFiles: File[]): void => {
    const file = acceptedFiles[0];
    console.log(file);
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  return (
    <PhotoContainer>
      <StyledDropzone maxFiles={1} onDrop={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <StyledDropzoneDiv {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledPlusIcon />
            <p>{percent}</p>
          </StyledDropzoneDiv>
        )}
      </StyledDropzone>
    </PhotoContainer>
  );
};

const Photos = (): React.ReactElement => {
  return (
    <PhotosContainer>
      <Photo />
      <Photo />
      <Photo />
      <Photo />
    </PhotosContainer>
  );
};

export default Photos;
