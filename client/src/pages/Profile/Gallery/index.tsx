import React from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
// import colors from '../../../utils/colors';

const GalleryContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Gallery = (): React.ReactElement => {
  return (
    <GalleryContainer>
      <PaddingContainer></PaddingContainer>
    </GalleryContainer>
  );
};

export default Gallery;
