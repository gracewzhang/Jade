import styled from 'styled-components';
import colors from '../../utils/colors';

export interface ScrollContainerProps {
  scroll: boolean;
}

const ScrollContainer = styled.div<ScrollContainerProps>`
  height: 100%;
  overflow-y: ${(props) => (props.scroll ? 'scroll' : 'none')};

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors['light-grey']};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.grey};
  }
`;

export default ScrollContainer;
