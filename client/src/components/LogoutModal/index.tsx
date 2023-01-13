import React from 'react';
import styled from 'styled-components';

import { LogoutModalProps, SignoutButtonProps } from './types';
import colors from '../../utils/colors';
import useStore from '../../stores';
import { darken } from 'color2k';
import { useAuth } from '../../hooks/auth/useAuth';

const ModalContainer = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);

  min-width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  font-size: 14px;
  background: white;
`;

const Content = styled.div`
  padding: 8%;
  padding-bottom: 3%;
  text-align: center;
`;

const Label = styled.p`
  font-weight: 500;
`;

const Footer = styled.span`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  height: 30px;
  min-width: max(50%, 50px);
  font-family: 'Ubuntu', sans-serif;
  border: 0;
  background-color: white;
  padding: 4%;
  padding-bottom: 8%;

  :hover {
    cursor: pointer;
  }
`;

const CancelButton = styled(Button)`
  border-radius: 0 0 0 20px;

  :hover {
    background-color: ${colors['light-grey']};
  }
`;

const SignoutButton = styled(Button)<SignoutButtonProps>`
  background-color: ${(props) => props.primaryColor};
  color: white;
  border-radius: 0 0 20px 0;

  :hover {
    background-color: ${(props) => props.darkPrimaryColor};
  }
`;

const LogoutModal = (props: LogoutModalProps): React.ReactElement => {
  const { isVisible, setIsVisible, setIsLoggedIn } = props;
  const { signOut } = useAuth();
  const user = useStore((state) => state.user);

  const handleSignout = (): void => {
    signOut();
    setIsLoggedIn(false);
  };

  if (!isVisible) return <></>;
  return (
    <ModalContainer>
      <Content>
        <Label>Are you sure you would like to log out?</Label>
      </Content>
      <Footer>
        <CancelButton onClick={() => setIsVisible(false)}>Cancel</CancelButton>
        <SignoutButton
          onClick={handleSignout}
          primaryColor={user?.primary_color ?? colors.rose}
          darkPrimaryColor={darken(user?.primary_color ?? colors.rose, 0.1)}
        >
          Yes
        </SignoutButton>
      </Footer>
    </ModalContainer>
  );
};

export default LogoutModal;
