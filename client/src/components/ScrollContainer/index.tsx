import styled from 'styled-components';
import colors from '../../utils/colors';

const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: scroll;

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
