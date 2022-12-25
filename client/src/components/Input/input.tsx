import styled from 'styled-components';
import colors from '../../styles/colors';

const Input = styled.textarea`
  resize: none;
  font-family: 'Ubuntu', sans-serif;
  line-height: 25px;
  outline: 0;
  border: 0;

  ::placeholder {
    color: ${colors['light-grey']};
  }
`;

export default Input;
