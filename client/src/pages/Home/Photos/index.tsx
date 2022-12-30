import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { HiOutlinePlus } from 'react-icons/hi2';

import Block from '../../../components/Block';
import colors from '../../../utils/colors';

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
  return (
    <PhotoContainer>
      <StyledDropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <StyledDropzoneDiv {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledPlusIcon />
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
