import React from 'react';
import styled from 'styled-components';

const MessagesContainer = styled.div`
  padding: 7vh 7vw 9vh 7vw;
  height: calc(100% - 7vh - 9vh);
`;

const Messages = (): React.ReactElement => {
  return <MessagesContainer>Messages (IP)</MessagesContainer>;
};

export default Messages;
