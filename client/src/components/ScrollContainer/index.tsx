import styled from 'styled-components';
import colors from '../../utils/colors';

const ScrollContainer = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
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

export default ScrollContainer;
